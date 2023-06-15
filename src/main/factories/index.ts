import { PrismaClient } from '@prisma/client';
import { PrismaUserRepository } from '../../infrastructure/repositories/prisma/user.repository';
import { HealthCheckController } from '../../app/controllers/healthCheck.controller';
import { AuthenticateController } from '../../app/controllers/authenticate.controller';
import { CreateUserController } from '../../app/controllers/createUser.controller';
import { CreateDogController } from '../../app/controllers/createDog.controller';
import { GetDogsController } from '../../app/controllers/getDogs.controller';
import { GetDogsUseCase } from '../../app/useCases/getDogs.useCase';
import { AuthenticateUseCase } from '../../app/useCases/authenticate.useCase';
import { CreateUserUseCase } from '../../app/useCases/createUser.useCase';
import { PrismaDogRepository } from '../../infrastructure/repositories/prisma/dog.repository';
import { CreateDogUseCase } from '../../app/useCases/createDog.useCase';
import { AddAddressUseCase } from '../../app/useCases/addAddress.useCase';
import { AddAddressController } from '../../app/controllers/addAddress.controller';
import { PrismaTripRepository } from '../../infrastructure/repositories/prisma/trip.repository';
import { GetTripsController } from '../../app/controllers/getTrips.controller';
import { GetTripsUseCase } from '../../app/useCases/getTrips.useCase';

const prisma = new PrismaClient();

const userRepository = new PrismaUserRepository(prisma);
const dogRepository = new PrismaDogRepository(prisma);
const tripRepository = new PrismaTripRepository(prisma);

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
  const getDogsUseCase = new GetDogsUseCase(dogRepository);
  const getDogsController = new GetDogsController(getDogsUseCase);
  return getDogsController;
}

export function makeCreateUserController() {
  const createUserUseCase = new CreateUserUseCase(userRepository);
  const createUserController = new CreateUserController(createUserUseCase);
  return createUserController;
}

export function makeCreateDogController() {
  const createDogUseCase = new CreateDogUseCase(dogRepository);
  const createDogController = new CreateDogController(createDogUseCase);
  return createDogController;
}

export function makeAddAddressController() {
  const addAddressUseCase = new AddAddressUseCase(userRepository);
  const addAddressController = new AddAddressController(addAddressUseCase);
  return addAddressController;
}

export function makeGetTripsController() {
  const getTripsUseCase = new GetTripsUseCase(tripRepository);
  const getTripsController = new GetTripsController(getTripsUseCase);
  return getTripsController;
}
