/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeHealthCheckController } from '../factories/makeHealthCheckController';
import { adaptRoute } from '../adapters/adaptRoute';

export default (router: Router): void => {
  router.get('/health-check', adaptRoute(makeHealthCheckController()));
};
