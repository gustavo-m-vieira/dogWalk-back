import jwt from 'jsonwebtoken';
import { AuthenticationMiddleware } from '../../../src/infrastructure/middleware/authentication.middleware';

const verifySpy = jest.spyOn(jwt, 'verify');

describe('AuthenticationMiddleware', () => {
  let authenticationMiddleware: AuthenticationMiddleware;

  beforeEach(() => {
    authenticationMiddleware = new AuthenticationMiddleware('secret');
  });

  describe('handle', () => {
    it('should authenticate', async () => {
      verifySpy.mockImplementationOnce(() => ({ user: { id: 'id', role: 'admin' } }));

      const response = await authenticationMiddleware.execute(
        {
          headers: {
            authorization: 'token',
          },
        } as any,
        { status: (x) => ({ json: () => `${x} error` }) } as any,
        (() => {}) as any
      );

      expect(response).toBeUndefined();
    });
  });

  it('should not authenticate - invalid token', async () => {
    verifySpy.mockImplementationOnce(() => {
      throw new Error('error');
    });

    const response = await authenticationMiddleware.execute(
      {
        headers: {
          authorization: 'token',
        },
      } as any,
      { status: (x) => ({ json: () => `${x} error` }) } as any,
      (() => {}) as any
    );

    expect(response).toBe('401 error');
  });

  it('should not authenticate - token not provided', async () => {
    const response = await authenticationMiddleware.execute(
      {
        headers: {},
      } as any,
      { status: (x) => ({ json: () => `${x} error` }) } as any,
      (() => {}) as any
    );

    expect(response).toBe('400 error');
  });
});
