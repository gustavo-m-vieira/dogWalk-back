import { Address } from '../entities/address';
import type { IUserRepository } from '../repositories/IUser.repository';
import type { IGetAddressDTO } from '../dto/getAddress.dto';

export class GetAddressUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: IGetAddressDTO): Promise<Address> {
    const { userId, addressId, requester } = data;

    if (requester.role !== 'ADMIN' && requester.id !== userId)
      throw new Error('You cannot get another user address');

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const address = user.addresses.find((ad) => ad.id === addressId);

    if (!address) {
      throw new Error('Address not found');
    }

    return address;
  }
}
