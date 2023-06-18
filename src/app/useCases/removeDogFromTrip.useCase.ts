import { Trip } from '../entities/trip';
import { ITripRepository } from '../repositories/ITrip.repository';

export class RemoveDogFromTripUseCase {
  constructor(private tripRepository: ITripRepository) {}

  async execute(tripId: string, dogId: string): Promise<Trip> {
    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    if (trip.removeDog(dogId)) await this.tripRepository.save(trip);

    return trip;
  }
}
