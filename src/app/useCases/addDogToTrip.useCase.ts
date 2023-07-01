import { Trip } from '../entities/trip';
import { IDogRepository } from '../repositories/IDog.repository';
import { ITripRepository } from '../repositories/ITrip.repository';
import { IAddDogToTripDTO } from '../dto/addDogToTrip.dto';
import { UserRoleEnum } from '../enums';

export class AddDogToTripUseCase {
  constructor(private tripRepository: ITripRepository, private dogRepository: IDogRepository) {}

  async execute(data: IAddDogToTripDTO): Promise<Trip> {
    const { tripId, dogId, requester } = data;

    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    const dog = await this.dogRepository.findById(dogId);

    if (!dog) throw new Error('Dog not found');

    if (requester.role !== UserRoleEnum.ADMIN && dog.tutorId !== requester.id)
      throw new Error('You are not the tutor of this dog');

    if (trip.addDog(dog.id)) await this.tripRepository.save(trip);

    return trip;
  }
}
