import { Request, Response, NextFunction } from 'express';
import { User } from '../../app/entities/user';
import { UserRoleEnum } from '../../app/enums';

export class AuthorizationMiddleware {
  constructor(private allowedRoles: Array<UserRoleEnum>) {}

  // eslint-disable-next-line consistent-return
  async execute(
    req: Request & { requestContext?: { authorizer?: { user: User } } },
    res: Response,
    next: NextFunction
  ) {
    const { user } = req.requestContext?.authorizer || {};

    if (!user) return res.status(401).json({ error: 'Not Authenticated' });

    if (!this.allowedRoles.includes(user.role))
      return res.status(403).json({ error: 'Not Authorized' });

    next();
  }
}
