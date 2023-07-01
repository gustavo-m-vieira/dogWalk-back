import { IReturnDogFromTripDTO } from '../dto/returnDogFromTrip.dto';
import { UserRoleEnum } from '../enums';
import { IDogRepository } from '../repositories/IDog.repository';
import { ITripRepository } from '../repositories/ITrip.repository';

export class ReturnDogFromTripUseCase {
  constructor(
    private tripRepository: ITripRepository,
    private readonly dogRepository: IDogRepository
  ) {}

  async execute(data: IReturnDogFromTripDTO): Promise<void> {
    const { tripId, dogId, requester } = data;

    const trip = await this.tripRepository.findById(tripId);

    if (!trip) {
      throw new Error('Trip not found');
    }

    const tripDogRelation = trip.dogs.find((dog) => dog.id === dogId);

    if (!tripDogRelation) {
      throw new Error('Dog not in trip');
    }

    const dog = await this.dogRepository.findById(dogId);

    if (!dog) throw new Error('Dog not found');

    if (dog.tutorId !== requester.id && requester.role !== UserRoleEnum.ADMIN)
      throw new Error('You cannot return a dog from a trip that is not yours');

    if (!tripDogRelation.caughtAt) {
      throw new Error('Dog not caught');
    }

    if (trip.dropDog(dogId)) await this.tripRepository.save(trip);
  }
}
