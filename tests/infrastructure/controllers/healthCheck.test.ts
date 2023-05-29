import { HealthCheckController } from '../../../src/infrastructure/controllers/HealthCheck/healthCheck.controller';

describe('HealthCheckController', () => {
  test('should return 200', async () => {
    const sut = new HealthCheckController();
    const res = await sut.handle();
    expect(res.statusCode).toBe(200);
  });
});
