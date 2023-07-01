import { IDeleteTripDTO } from '../dto/deleteTrip.dto';
import { ITripRepository } from '../repositories/ITrip.repository';

export class DeleteTripUseCase {
  constructor(private readonly tripRepository: ITripRepository) {}

  async execute(data: IDeleteTripDTO): Promise<void> {
    const { tripId, requester } = data;

    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    if (requester.role !== 'ADMIN' && requester.id !== trip.walkerId)
      throw new Error('You cannot delete another user trip');

    if (trip.delete()) await this.tripRepository.save(trip);
  }
}
