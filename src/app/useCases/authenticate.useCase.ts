import jwt from 'jsonwebtoken';
import { User } from '../entities/user';
import { IUserRepository } from '../repositories/IUser.repository';

export class AuthenticateUseCase {
  constructor(private readonly jwtKey: string, private readonly userRepository: IUserRepository) {}

  async execute(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) throw new Error('User not found');

    if (!user.validatePassword(password)) throw new Error('Invalid password');

    return this.generateToken(user);
  }

  private generateToken(user: User): string {
    const options: jwt.SignOptions = {
      algorithm: 'HS256',
      expiresIn: '1h',
    };

    const token: string = jwt.sign({ user }, this.jwtKey, options);

    return token;
  }
}
