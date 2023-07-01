import { IConfirmDogTripDTO } from '../dto/confirmDogTrip.dto';
import { ITripRepository } from '../repositories/ITrip.repository';

export class ConfirmDogTripUseCase {
  constructor(private tripRepository: ITripRepository) {}

  async execute(data: IConfirmDogTripDTO): Promise<void> {
    const { dogId, tripId, requester } = data;

    const trip = await this.tripRepository.findById(tripId);

    if (!trip) {
      throw new Error('Trip not found');
    }

    const tripDogRelation = trip.dogs.find((dog) => dog.id === dogId);

    if (!tripDogRelation) {
      throw new Error('Dog not in trip');
    }

    if (tripDogRelation.droppedAt) {
      throw new Error('Dog already dropped');
    }

    if (requester.role !== 'ADMIN' && trip.walkerId !== requester.id)
      throw new Error('You are not the walker of this trip');

    if (trip.catchDog(dogId)) await this.tripRepository.save(trip);
  }
}
