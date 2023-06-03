import { adaptRoute } from '../../../src/main/adapters/adaptRoute';

describe('Adapt Route', () => {
  test('should return a function', async () => {
    const controller = {
      handle: jest.fn(),
    };
    const sut = adaptRoute(controller);
    expect(sut).toBeInstanceOf(Function);
  });

  test('should call controller handle with correct request', async () => {
    const controller = {
      handle: jest.fn(() => Promise.resolve({ statusCode: 200, body: {} })),
    };
    const sut = adaptRoute(controller);
    const req = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
      },
      headers: {},
    };
    await sut(req as any, { status: jest.fn(() => ({ json: jest.fn() })), json: jest.fn() } as any);
    expect(controller.handle).toHaveBeenCalledWith(req);
  });
});
