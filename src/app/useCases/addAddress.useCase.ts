import { IUserRepository } from '../repositories/IUser.repository';
import { Address } from '../entities/address';
import { IAddAddressDTO } from '../dto/addAddress.dto';

export class AddAddressUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: IAddAddressDTO): Promise<Address> {
    const { city, country, street, number, zipCode, district, state, complement, userId } = data;

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
