import { Request, Response, NextFunction } from 'express';
import { User, RolesEnum } from '../../app/entities/user';

export class AuthorizationMiddleware {
  constructor(private allowedRoles: Array<RolesEnum>) {}

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
