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
import { CreateTripUseCase } from '../../app/useCases/createTrip.useCase';
import { CreateTripController } from '../../app/controllers/createTrip.controller';
import { GetAddressUseCase } from '../../app/useCases/getAddress.useCase';
import { DeleteDogController } from '../../app/controllers/deleteDog.controller';
import { DeleteDogUseCase } from '../../app/useCases/deleteDog.useCase';
import { GetTripController } from '../../app/controllers/getTrip.controller';
import { GetTripUseCase } from '../../app/useCases/getTrip.useCase';
import { AddDogToTripController } from '../../app/controllers/addDogToTrip.controller';
import { AddDogToTripUseCase } from '../../app/useCases/addDogToTrip.useCase';
import { RemoveDogFromTripController } from '../../app/controllers/removeDogFromTrip.controller';
import { RemoveDogFromTripUseCase } from '../../app/useCases/removeDogFromTrip.useCase';
import { ConfirmDogTripController } from '../../app/controllers/confirmDogTrip.controller';
import { ConfirmDogTripUseCase } from '../../app/useCases/confirmDogTrip.useCase';
import { ReturnDogFromTripUseCase } from '../../app/useCases/returnDogFromTrip.useCase';
import { ReturnDogFromTripController } from '../../app/controllers/returnDogFromTrip.controller';
import { DeleteTripController } from '../../app/controllers/deleteTrip.controller';
import { DeleteTripUseCase } from '../../app/useCases/deleteTrip.useCase';

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

export function makeCreateTripController() {
  const createTripUseCase = new CreateTripUseCase(tripRepository);
  const getAddressUseCase = new GetAddressUseCase(userRepository);
  const createTripController = new CreateTripController(createTripUseCase, getAddressUseCase);
  return createTripController;
}

export function makeDeleteDogController() {
  const deleteDogUseCase = new DeleteDogUseCase(dogRepository);
  const deleteDogController = new DeleteDogController(deleteDogUseCase);
  return deleteDogController;
}

export function makeGetTripController() {
  const getTripUseCase = new GetTripUseCase(tripRepository, dogRepository, userRepository);
  const getTripController = new GetTripController(getTripUseCase);
  return getTripController;
}

export function makeAddDogToTripController() {
  const addDogToTripUseCase = new AddDogToTripUseCase(tripRepository, dogRepository);
  const addDogToTripController = new AddDogToTripController(addDogToTripUseCase);
  return addDogToTripController;
}

export function makeRemoveDogFromTripController() {
  const removeDogFromTripUseCase = new RemoveDogFromTripUseCase(tripRepository, dogRepository);
  const removeDogFromTripController = new RemoveDogFromTripController(removeDogFromTripUseCase);
  return removeDogFromTripController;
}

export function makeConfirmDogTripController() {
  const confirmDogTripUseCase = new ConfirmDogTripUseCase(tripRepository);
  const confirmDogTripController = new ConfirmDogTripController(confirmDogTripUseCase);
  return confirmDogTripController;
}

export function makeReturnDogFromTripController() {
  const returnDogFromTripUseCase = new ReturnDogFromTripUseCase(tripRepository, dogRepository);
  const returnDogFromTripController = new ReturnDogFromTripController(returnDogFromTripUseCase);
  return returnDogFromTripController;
}

export function makeDeleteTripController() {
  const deleteTripUseCase = new DeleteTripUseCase(tripRepository);
  const deleteTripController = new DeleteTripController(deleteTripUseCase);
  return deleteTripController;
}
