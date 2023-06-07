import jwt from 'jsonwebtoken';
import { AuthenticateUseCase } from '../../../src/app/useCases/authenticate.useCase';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';

const signSpy = jest.spyOn(jwt, 'sign');

jest.mock('md5', () => ({
  __esModule: true,
  default: jest.fn((value: string) => value),
}));

describe('AuthenticateUseCase', () => {
  test('should return a token when called with valid credentials', async () => {
    const useCase = new AuthenticateUseCase('secret', new MockUserRepository());

    const token = await useCase.execute('email@email.com', 'e10adc3949ba59abbe56e057f20f883e');

    expect(token).toEqual(expect.any(String));
    expect(signSpy).toHaveBeenCalled();
  });

  test('should return error because user not found', async () => {
    const useCase = new AuthenticateUseCase('secret', new MockUserRepository());

    expect(() =>
      useCase.execute('unexistent@email.com', 'e10adc3949ba59abbe56e057f20f883e')
    ).rejects.toThrowError('User not found');

    expect(signSpy).not.toHaveBeenCalled();
  });

  test('should return error because invalid password', async () => {
    const useCase = new AuthenticateUseCase('secret', new MockUserRepository());

    expect(() => useCase.execute('email@email.com', 'invalid')).rejects.toThrowError(
      'Invalid password'
    );

    expect(signSpy).not.toHaveBeenCalled();
  });
});
