import { Express, Router } from 'express';
import healthCheck from '../routes/healthCheck';
import generateToken from '../routes/generateToken';
import getDogs from '../routes/getDogs';
import createUser from '../routes/createUser';
import createDog from '../routes/createDog';
import addAddress from '../routes/addAddress';
import getTrips from '../routes/getTrips';
import createTrip from '../routes/createTrip';
import deleteDog from '../routes/deleteDog';
import getTrip from '../routes/getTrip';
import addDogToTrip from '../routes/addDogToTrip';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  healthCheck(router);
  generateToken(router);
  getDogs(router);
  createUser(router);
  createDog(router);
  addAddress(router);
  getTrips(router);
  createTrip(router);
  deleteDog(router);
  getTrip(router);
  addDogToTrip(router);
};
