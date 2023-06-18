import { Trip } from '../entities/trip';
import { IDogRepository } from '../repositories/IDog.repository';
import { ITripRepository } from '../repositories/ITrip.repository';

export class AddDogToTripUseCase {
  constructor(private tripRepository: ITripRepository, private dogRepository: IDogRepository) {}

  async execute(tripId: string, dogId: string): Promise<Trip> {
    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    const dog = await this.dogRepository.findById(dogId);

    if (!dog) throw new Error('Dog not found');

    if (trip.addDog(dog.id)) await this.tripRepository.save(trip);

    return trip;
  }
}
