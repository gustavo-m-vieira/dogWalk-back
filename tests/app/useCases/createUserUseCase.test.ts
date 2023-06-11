import { UserRoleEnum } from '../../../src/app/enums';
import { CreateUserUseCase } from '../../../src/app/useCases/createUser.useCase';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';

jest.mock('uuid', () => ({
  v4: () => '6427523b-9abf-417b-af1a-c0a634e97de1',
}));

const mockUserRepository = new MockUserRepository();

let createUserUseCase;

describe('CreateUserUseCase', () => {
  beforeEach(() => {
    createUserUseCase = new CreateUserUseCase(mockUserRepository);
  });

  it('should create a new user', async () => {
    const user = await createUserUseCase.execute({
      name: 'John Doe',
      email: 'diff@email.com',
      cpf: '00000000000',
      telephone: '00000000000',
      password: '123456',
      role: UserRoleEnum.TUTOR,
    });

    expect(user.toJSON()).toStrictEqual({
      addresses: [],
      cpf: '00000000000',
      createdAt: expect.any(String),
      deletedAt: undefined,
      email: 'diff@email.com',
      id: '6427523b-9abf-417b-af1a-c0a634e97de1',
      name: 'John Doe',
      role: 'TUTOR',
      telephone: '00000000000',
    });
  });

  it('should throw an error if email is already in use', async () => {
    await expect(() =>
      createUserUseCase.execute({
        name: 'John Doe',
        email: 'email@email.com',
        cpf: '00000000000',
        telephone: '00000000000',
        password: '123456',
        role: UserRoleEnum.TUTOR,
      })
    ).rejects.toThrowError('Email already in use');
  });
});
