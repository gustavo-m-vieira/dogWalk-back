import { Request, Response } from 'express';
import { IController } from '../../infrastructure/controllers/IController';

export function adaptRoute(controller: IController) {
  return async (req: Request, res: Response) => {
    const { statusCode, body } = await controller.handle(req);
    res.status(statusCode).json(body);
  };
}
