import { Request, Response } from 'express';
import { IController, IRequest } from '../../app/controllers/IController';

export function adaptRoute(controller: IController) {
  return async (req: Request, res: Response) => {
    const { body, headers, query, params, requestContext } = req as Request & {
      requestContext: IRequest['requestContext'];
    };

    const request: IRequest = {
      body,
      headers: headers as Record<string, string>,
      pathParameters: params,
      queryStringParameters: query as Record<string, string>,
      requestContext,
    };

    const { statusCode, body: resBody } = await controller.handle(request);

    if (statusCode) res.status(statusCode).json(resBody);
  };
}
