import { Trip } from '../entities/trip';
import type { ITripRepository } from '../repositories/ITrip.repository';
import { ICreateTripDTO } from '../dto/createTrip.dto';

export class CreateTripUseCase {
  constructor(private readonly tripsRepository: ITripRepository) {}

  async execute(data: ICreateTripDTO): Promise<Trip> {
    const { addressId, dogType, duration, slots, startDate, walkerId } = data;

    const trip = new Trip({
      addressId,
      dogType,
      duration,
      slots,
      startDate: new Date(startDate),
      walkerId,
      dogs: [],
    });

    await this.tripsRepository.save(trip);

    return trip;
  }
}
