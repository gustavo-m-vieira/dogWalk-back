import { Router } from 'express';
import { makeAuthenticateController } from '../factories';
import { adaptRoute } from '../adapters/adaptRoute';

export default (router: Router): void => {
  router.get('/generate-token', adaptRoute(makeAuthenticateController()));
};
