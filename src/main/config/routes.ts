import { Express, Router } from 'express';
import healthCheck from '../routes/healthCheck';
import generateToken from '../routes/generateToken';
import getDogs from '../routes/getDogs';
import createUser from '../routes/createUser';
import createDog from '../routes/createDog';
import addAddress from '../routes/addAddress';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  healthCheck(router);
  generateToken(router);
  getDogs(router);
  createUser(router);
  createDog(router);
  addAddress(router);
};
