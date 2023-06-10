import { User } from '../../../app/entities/user';
import { UserRoleEnum } from '../../../app/enums';
import { IUserRepository } from '../../../app/repositories/IUserRepository';

export class MockUserRepository implements IUserRepository {
  private users: User[];

  constructor() {
    this.users = [
      new User(
        {
          name: 'John Doe',
          email: 'email@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: UserRoleEnum.ADMIN,
          telephone: '00000000000',
          cpf: '47550151032',
          addresses: [],
        },
        { id: '1', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new User(
        {
          name: 'John Doe',
          email: 'admin@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: UserRoleEnum.ADMIN,
          telephone: '00000000000',
          cpf: '47550151032',
          addresses: [],
        },
        { id: '2', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new User(
        {
          name: 'John Doe',
          email: 'tutor@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: UserRoleEnum.TUTOR,
          telephone: '00000000000',
          cpf: '47550151032',
          addresses: [],
        },
        { id: '3', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new User(
        {
          name: 'John Doe',
          email: 'walker@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: UserRoleEnum.WALKER,
          telephone: '00000000000',
          cpf: '47550151032',
          addresses: [],
        },
        { id: '4', createdAt: new Date('2021-01-01T00:00:00.000Z') }
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
    if (await this.findByEmail(user.email)) throw new Error('User already exists');

    this.users.push(user);
  }
}
