import { MockUserRepository } from '../../../src/infrastructure/repositories/mockUser.repository';
import { User, RolesEnum } from '../../../src/app/entities/user';

describe('MockUserRepository', () => {
  test('should return a user when called with existent email', async () => {
    const repository = new MockUserRepository();

    const user = await repository.findByEmail('email@email.com');

    expect(user?.toJSON()).toStrictEqual({
      createdAt: '2021-01-01T00:00:00.000Z',
      email: 'email@email.com',
      id: '1',
      name: 'John Doe',
      role: 'ADMIN',
      telephone: '00000000000',
    });
  });

  test('should return a user when called with existent id', async () => {
    const repository = new MockUserRepository();

    const user = await repository.findById('1');

    expect(user?.toJSON()).toStrictEqual({
      createdAt: '2021-01-01T00:00:00.000Z',
      email: 'email@email.com',
      id: '1',
      name: 'John Doe',
      role: 'ADMIN',
      telephone: '00000000000',
    });
  });

  test('should save a user', async () => {
    const repository = new MockUserRepository();

    await repository.save(
      new User({
        name: 'Jane Doe',
        email: 'example@email.com',
        passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
        role: RolesEnum.ADMIN,
        telephone: '00000000000',
      })
    );
  });

  test('should throw an error when trying to save a user with an existent email', async () => {
    const repository = new MockUserRepository();

    expect(() =>
      repository.save(
        new User({
          name: 'Jane Doe',
          email: 'email@email.com',
          passwordHash: 'e10adc3949ba59abbe56e057f20f883e', // 123456
          role: RolesEnum.ADMIN,
          telephone: '00000000000',
        })
      )
    ).rejects.toThrowError('User already exists');
  });
});
