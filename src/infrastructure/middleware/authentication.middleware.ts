import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export class AuthenticationMiddleware {
  constructor(private secretKey: string) {}

  // eslint-disable-next-line consistent-return
  async authenticate(req: Request & { requestContext: any }, res: Response, next: NextFunction) {
    try {
      const token = req.headers.Authorization as string;

      if (!token) return res.status(401).json({ error: 'Authorization token not provided' });

      try {
        const decoded = jwt.verify(token, this.secretKey);
        req.requestContext = { authorizer: decoded };
        next();
      } catch (error) {
        res.status(401).json({ message: 'Token de autenticação inválido' });
      }

      next();
    } catch (error) {
      console.error('Authentication error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}
