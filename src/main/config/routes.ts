import { Express, Router } from 'express';
import healthCheck from '../routes/healthCheck';

export default (app: Express): void => {
  const router = Router();
  app.use('/api', router);
  healthCheck(router);
};
