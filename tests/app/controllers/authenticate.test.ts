import { AuthenticateController } from '../../../src/app/controllers/authenticate.controller';
import { AuthenticateUseCase } from '../../../src/app/useCases/authenticate.useCase';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';

jest.mock('../../../src/app/useCases/authenticate.useCase');

const executeSpy = jest.spyOn(AuthenticateUseCase.prototype, 'execute');

describe('AuthenticateController', () => {
  test('should return a token when called with valid credentials', async () => {
    executeSpy.mockResolvedValue('token');

    const controller = new AuthenticateController(
      new AuthenticateUseCase('secret', new MockUserRepository())
    );

    const response = await controller.handle({
      body: {
        email: 'email@email.com',
        password: 'e10adc3949ba59abbe56e057f20f883e',
      },
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 200 }));
    expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
  });

  test('should return a 400 status code when called with invalid credentials', async () => {
    executeSpy.mockRejectedValue(new Error());

    const controller = new AuthenticateController(
      new AuthenticateUseCase('secret', new MockUserRepository())
    );

    const response = await controller.handle({
      body: {
        email: 'invalid',
        password: 'invalid',
      },
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 400 }));
  });

  test('should return a 400 status code when called with missing parameters', async () => {
    const controller = new AuthenticateController(
      new AuthenticateUseCase('secret', new MockUserRepository())
    );

    const response = await controller.handle({
      body: {},
      headers: {},
    });

    expect(response).toEqual(expect.objectContaining({ statusCode: 400 }));
  });
});
