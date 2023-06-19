import { ITripRepository } from '../repositories/ITrip.repository';

export class DeleteTripUseCase {
  constructor(private readonly tripRepository: ITripRepository) {}

  async execute(id: string): Promise<void> {
    const trip = await this.tripRepository.findById(id);

    if (!trip) throw new Error('Trip not found');

    if (trip.delete()) await this.tripRepository.save(trip);
  }
}
