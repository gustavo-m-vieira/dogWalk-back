/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeGetDogsController } from '../factories';
import { adaptRoute } from '../adapters/adaptRoute';
import { AuthenticationMiddleware } from '../../infrastructure/middleware/authentication.middleware';
import { AuthorizationMiddleware } from '../../infrastructure/middleware/authorization.middleware';
import { RolesEnum } from '../../app/entities/user';

export default (router: Router): void => {
  router.get('/dogs', (req, res, next) =>
    new AuthenticationMiddleware(process.env.JWT_KEY).authenticate(req, res, next)
  );

  router.get(
    '/dogs',

    (req, res, next) => new AuthorizationMiddleware([RolesEnum.TUTOR]).authorize(req, res, next)
  );

  router.get(
    '/dogs',

    adaptRoute(makeGetDogsController())
  );
};
