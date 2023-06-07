import { HealthCheckController } from '../../../src/app/controllers/healthCheck.controller';

describe('HealthCheckController', () => {
  test('should return 200', async () => {
    const sut = new HealthCheckController();
    const res = await sut.handle();
    expect(res.statusCode).toBe(200);
  });
});
