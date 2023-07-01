import { Trip } from '../entities/trip';
import { ITripRepository } from '../repositories/ITrip.repository';
import { IRemoveDogFromTripDTO } from '../dto/removeDogFromTrip.dto';
import { UserRoleEnum } from '../enums';
import { IDogRepository } from '../repositories/IDog.repository';

export class RemoveDogFromTripUseCase {
  constructor(
    private tripRepository: ITripRepository,
    private readonly dogRepository: IDogRepository
  ) {}

  async execute(data: IRemoveDogFromTripDTO): Promise<Trip> {
    const { tripId, dogId, requester } = data;

    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    if (trip.dogs.find((dog) => dog.id === dogId)) {
      const dog = await this.dogRepository.findById(dogId);

      if (!dog) throw new Error('Dog not found');

      if (dog.tutorId !== requester.id && requester.role !== UserRoleEnum.ADMIN)
        throw new Error('You cannot remove another user dog');
    }

    if (trip.removeDog(dogId)) await this.tripRepository.save(trip);

    return trip;
  }
}
