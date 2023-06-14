/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import { makeAddAddressController } from '../factories';
import { adaptRoute } from '../adapters/adaptRoute';
import { AuthenticationMiddleware } from '../../infrastructure/middleware/authentication.middleware';
import { AuthorizationMiddleware } from '../../infrastructure/middleware/authorization.middleware';
import { UserRoleEnum } from '../../app/enums';

export default (router: Router): void => {
  router.post(
    '/users/:userId/addresses',
    (req, res, next) => new AuthenticationMiddleware(process.env.JWT_KEY).execute(req, res, next),
    (req, res, next) =>
      new AuthorizationMiddleware([UserRoleEnum.TUTOR, UserRoleEnum.WALKER]).execute(
        req,
        res,
        next
      ),
    adaptRoute(makeAddAddressController())
  );
};
