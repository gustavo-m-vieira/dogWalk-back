import { Address } from '../entities/address';
import { Dog } from '../entities/dog';
import { Trip } from '../entities/trip';
import { User } from '../entities/user';
import { IDogRepository } from '../repositories/IDog.repository';
import { ITripRepository } from '../repositories/ITrip.repository';
import { IUserRepository } from '../repositories/IUser.repository';

interface IResponse {
  trip: Trip;
  dogs: Dog[];
  walker: User;
  address: Address;
}

export class GetTripUseCase {
  constructor(
    private readonly tripRepository: ITripRepository,
    private readonly dogRepository: IDogRepository,
    private readonly userRepository: IUserRepository
  ) {}

  async execute(id: string): Promise<IResponse> {
    const trip = await this.tripRepository.findById(id);

    if (!trip) throw new Error('Trip not found');

    const walker = await this.userRepository.findById(trip.walkerId);

    if (!walker) throw new Error('Walker not found');

    const dogs = await this.dogRepository.findByIds(trip.dogs);

    const address = walker.addresses.find((ad) => ad.id === trip.addressId)!;

    return {
      trip,
      dogs,
      walker,
      address,
    };
  }
}
