/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeCreateUserController } from '../factories';
import { adaptRoute } from '../adapters/adaptRoute';

export default (router: Router): void => {
  router.post('/users', adaptRoute(makeCreateUserController()));
};
