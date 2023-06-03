import { HealthCheckController } from '../../app/controllers/healthCheck.controller';

export function makeHealthCheckController() {
  const healthCheckController = new HealthCheckController();
  return healthCheckController;
}
