import { IUserRepository } from '../repositories/IUser.repository';
import { Address } from '../entities/address';
import { IAddAddressDTO } from '../dto/addAddress.dto';
import { UserRoleEnum } from '../enums';

export class AddAddressUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: IAddAddressDTO): Promise<Address> {
    const {
      city,
      country,
      street,
      number,
      zipCode,
      district,
      state,
      complement,
      userId,
      requester,
    } = data;

    if (requester.role !== UserRoleEnum.ADMIN && requester.id !== userId) {
      throw new Error('You are not allowed to add an address to another user');
    }

    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    const address = new Address({
      city,
      country,
      street,
      number,
      zipCode,
      district,
      state,
      complement,
    });

    user.addAddress(address);

    await this.userRepository.save(user);

    return address;
  }
}
