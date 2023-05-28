import { HealthCheckController } from '../../infrastructure/controllers/HealthCheck/healthCheck.controller';

export function makeHealthCheckController() {
  const healthCheckController = new HealthCheckController();
  return healthCheckController;
}
