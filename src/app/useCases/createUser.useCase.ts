import { ICreateUserDTO } from '../dto/createUser.dto';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/IUser.repository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(data: ICreateUserDTO): Promise<User> {
    if (await this.userRepository.findByEmail(data.email)) {
      throw new Error('Email already in use');
    }

    const passwordHash = User.generatePasswordHash(data.password);

    const user = new User({ ...data, passwordHash, addresses: [] });

    await this.userRepository.save(user);

    return user;
  }
}
