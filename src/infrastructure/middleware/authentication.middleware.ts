import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthenticationMiddleware {
  constructor(private secretKey: string) {}

  // eslint-disable-next-line consistent-return
  async execute(req: Request & { requestContext?: any }, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token) return res.status(400).json({ error: 'Authorization token not provided' });

    try {
      const decoded = jwt.verify(token, this.secretKey);

      req.requestContext = { authorizer: decoded };
      next();
    } catch (error) {
      console.error('AuthenticationMiddleware', { error });

      return res.status(401).json({ message: 'Invalid auth token' });
    }
  }
}
