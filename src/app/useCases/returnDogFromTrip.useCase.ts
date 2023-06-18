import { ITripRepository } from '../repositories/ITrip.repository';

export class ReturnDogFromTripUseCase {
  constructor(private tripRepository: ITripRepository) {}

  async execute(tripId: string, dogId: string): Promise<void> {
    const trip = await this.tripRepository.findById(tripId);

    if (!trip) {
      throw new Error('Trip not found');
    }

    const tripDogRelation = trip.dogs.find((dog) => dog.id === dogId);

    if (!tripDogRelation) {
      throw new Error('Dog not in trip');
    }

    if (!tripDogRelation.caughtAt) {
      throw new Error('Dog not caught');
    }

    if (trip.dropDog(dogId)) await this.tripRepository.save(trip);
  }
}
