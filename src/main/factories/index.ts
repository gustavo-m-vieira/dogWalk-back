import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma/user.repository';
import { HealthCheckController } from '../../app/controllers/healthCheck.controller';
import { AuthenticateController } from '../../app/controllers/authenticate.controller';
import { CreateUserController } from '../../app/controllers/createUser.controller';
import { GetDogsController } from '../../app/controllers/getDogs.controller';
import { AuthenticateUseCase } from '../../app/useCases/authenticate.useCase';
import { CreateUserUseCase } from '../../app/useCases/createUser.useCase';

const prisma = new PrismaClient();

const userRepository = new PrismaUserRepository(prisma);

export function makeHealthCheckController() {
  const healthCheckController = new HealthCheckController();
  return healthCheckController;
}

export function makeAuthenticateController() {
  const jwtKey = process.env.JWT_KEY;
  const authenticateUseCase = new AuthenticateUseCase(jwtKey, userRepository);
  const authenticateController = new AuthenticateController(authenticateUseCase);
  return authenticateController;
}

export function makeGetDogsController() {
  const getDogsController = new GetDogsController();
  return getDogsController;
}

export function makeCreateUserController() {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
}
