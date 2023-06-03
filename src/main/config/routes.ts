import { Express, Router } from 'express';
import healthCheck from '../routes/healthCheck';
import generateToken from '../routes/generateToken';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  healthCheck(router);
  generateToken(router);
};
