import { HealthCheckController } from '../../app/controllers/healthCheck.controller';
import { AuthenticateController } from '../../app/controllers/authenticate.controller';
import { AuthenticateUseCase } from '../../app/useCases/authenticate.useCase';
import { MockUserRepository } from '../../infrastructure/repositories/mockUser.repository';

const mockUserRepositoryInstance = new MockUserRepository();

export function makeHealthCheckController() {
  const healthCheckController = new HealthCheckController();
  return healthCheckController;
}

export function makeAuthenticateController() {
  const jwtKey = process.env.JWT_KEY;
  const authenticateUseCase = new AuthenticateUseCase(jwtKey, mockUserRepositoryInstance);
  const authenticateController = new AuthenticateController(authenticateUseCase);
  return authenticateController;
}
