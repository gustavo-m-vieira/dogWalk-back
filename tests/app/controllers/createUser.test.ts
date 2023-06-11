import { CreateUserController } from '../../../src/app/controllers/createUser.controller';
import { CreateUserUseCase } from '../../../src/app/useCases/createUser.useCase';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';
import { User } from '../../../src/app/entities/user';
import { UserRoleEnum } from '../../../src/app/enums';

jest.mock('uuid', () => ({
  v4: () => '7ad4954b-c8ec-4ae8-9b4a-6e9a1a4a8f1a',
}));
jest.mock('../../../src/app/useCases/createUser.useCase');

const executeSpy = jest.spyOn(CreateUserUseCase.prototype, 'execute');

let controller;

describe('CreateUserController', () => {
  beforeEach(() => {
    controller = new CreateUserController(new CreateUserUseCase(new MockUserRepository()));
  });

  test('should return a 200 status code when called with valid parameters', async () => {
    executeSpy.mockResolvedValueOnce(
      new User(
        {
          name: 'name',
          email: 'email',
          cpf: 'cpf',
          telephone: 'telephone',
          passwordHash: User.generatePasswordHash('password'),
          role: UserRoleEnum.TUTOR,
          addresses: [],
        },
        { createdAt: new Date('2023-06-11T16:02:39.498Z') }
      )
    );

    const response = await controller.handle({
      body: {
        name: 'name',
        email: 'email',
        cpf: 'cpf',
        telephone: 'telephone',
        password: 'password',
        role: UserRoleEnum.TUTOR,
      },
      headers: {},
    });

    expect(response).toStrictEqual({
      statusCode: 200,
      body: {
        message: 'User created successfully',
        user: {
          addresses: [],
          cpf: 'cpf',
          createdAt: '2023-06-11T16:02:39.498Z',
          deletedAt: undefined,
          email: 'email',
          id: '7ad4954b-c8ec-4ae8-9b4a-6e9a1a4a8f1a',
          name: 'name',
          role: 'TUTOR',
          telephone: 'telephone',
        },
      },
    });
  });

  test('should return a 400 status code when called with invalid parameters', async () => {
    const response = await controller.handle({
      body: {},
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 400 }));
  });

  test('should return a 400 status code when called with invalid role', async () => {
    const response = await controller.handle({
      body: {
        name: 'name',
        email: 'email',
        cpf: 'cpf',
        telephone: 'telephone',
        password: 'password',
        role: 'invalid',
      },
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 400 }));
  });

  test('should return a 500 status code when called with valid parameters but throws an error', async () => {
    executeSpy.mockRejectedValueOnce(new Error('Error'));

    const response = await controller.handle({
      body: {
        name: 'name',
        email: 'email',
        cpf: 'cpf',
        telephone: 'telephone',
        password: 'password',
        role: UserRoleEnum.TUTOR,
      },
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 500 }));
  });

  test('should return a 409 status because email already in use', async () => {
    executeSpy.mockRejectedValueOnce(new Error('Email already in use'));

    const response = await controller.handle({
      body: {
        name: 'name',
        email: 'email',
        cpf: 'cpf',
        telephone: 'telephone',
        password: 'password',
        role: UserRoleEnum.TUTOR,
      },
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 409 }));
  });
});
