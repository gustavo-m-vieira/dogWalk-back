import { ITripRepository } from '../repositories/ITrip.repository';
import { Trip } from '../entities/trip';
import { IGetTripsDTO } from '../dto/getTrips.dto';

export class GetTripsUseCase {
  constructor(private readonly tripRepository: ITripRepository) {}

  async execute(data: IGetTripsDTO): Promise<Trip[]> {
    if (data.zipCode)
      return this.tripRepository.findByZipCode(data.zipCode, { startDate: data.date });

    if (data.walkerId)
      return this.tripRepository.findByWalkerId(data.walkerId, { startDate: data.date });

    return [];
  }
}
