import { RolesEnum, User } from '../../app/entities/user';
import { IUserRepository } from '../../app/repositories/IUserRepository';

export class MockUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [
      new User(
        {
          name: 'John Doe',
          email: 'email@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: RolesEnum.ADMIN,
          telephone: '00000000000',
        },
        { id: '1', createdAt: '2021-01-01T00:00:00.000Z' }
      ),
    ];
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find((user) => user.id === id);
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
