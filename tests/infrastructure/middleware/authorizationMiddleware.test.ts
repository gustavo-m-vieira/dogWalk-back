import { UserRoleEnum } from '../../../src/app/enums';
import { AuthorizationMiddleware } from '../../../src/infrastructure/middleware/authorization.middleware';

describe('AuthorizationMiddleware', () => {
  test('should return 401 if user is not authenticated', async () => {
    const authorizationMiddleware = new AuthorizationMiddleware([UserRoleEnum.ADMIN]);

    const response = await authorizationMiddleware.execute(
      {
        requestContext: {},
      } as any,
      { status: (x) => ({ json: () => `${x} error` }) } as any,
      (() => {}) as any
    );

    expect(response).toBe('401 error');
  });

  test('should return 403 if user is not authorized', async () => {
    const authorizationMiddleware = new AuthorizationMiddleware([UserRoleEnum.ADMIN]);

    const response = await authorizationMiddleware.execute(
      {
        requestContext: {
          authorizer: {
            user: {
              role: 'user',
            },
          },
        },
      } as any,
      { status: (x) => ({ json: () => `${x} error` }) } as any,
      (() => {}) as any
    );

    expect(response).toBe('403 error');
  });

  test('should return undefined if user is authorized', async () => {
    const authorizationMiddleware = new AuthorizationMiddleware([UserRoleEnum.ADMIN]);

    const response = await authorizationMiddleware.execute(
      {
        requestContext: {
          authorizer: {
            user: {
              role: 'ADMIN',
            },
          },
        },
      } as any,
      { status: (x) => ({ json: () => `${x} error` }) } as any,
      (() => {}) as any
    );

    expect(response).toBeUndefined();
  });
});
