/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeRemoveDogFromTripController } from '../factories';
import { adaptRoute } from '../adapters/adaptRoute';
import { AuthenticationMiddleware } from '../../infrastructure/middleware/authentication.middleware';
import { AuthorizationMiddleware } from '../../infrastructure/middleware/authorization.middleware';
import { UserRoleEnum } from '../../app/enums';

export default (router: Router): void => {
  router.delete(
    '/trips/:tripId/dogs/:dogId',
    (req, res, next) => new AuthenticationMiddleware(process.env.JWT_KEY).execute(req, res, next),
    (req, res, next) => new AuthorizationMiddleware([UserRoleEnum.TUTOR]).execute(req, res, next),
    adaptRoute(makeRemoveDogFromTripController())
  );
};
