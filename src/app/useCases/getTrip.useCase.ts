import { IDogRepository } from '../repositories/IDog.repository';
import { ITripRepository } from '../repositories/ITrip.repository';
import { IUserRepository } from '../repositories/IUser.repository';

export class GetTripUseCase {
  constructor(
    private readonly tripRepository: ITripRepository,
    private readonly dogRepository: IDogRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(tripId: string) {
    const trip = await this.tripRepository.findById(tripId);

    if (!trip) throw new Error('Trip not found');

    const walker = await this.userRepository.findById(trip.walkerId);

    if (!walker) throw new Error('Walker not found');

    const dogs = await this.dogRepository.findByIds(trip.dogs.map((dog) => dog.id));

    const address = walker.addresses.find((ad) => ad.id === trip.addressId)!;

    return {
      ...trip.toJSON(),
      dogs: trip.toJSON().dogs.map(({ id, caughtAt, droppedAt }) => {
        const dog = dogs.find((d) => d.id === id)!;
        return {
          ...dog.toJSON(),
          caughtAt,
          droppedAt,
        };
      }),
      walker: {
        name: walker.name,
        id: walker.id,
      },
      address: { ...address.toJSON(), UserId: undefined, createdAt: undefined },
    };
  }
}
