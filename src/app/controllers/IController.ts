import { User } from '../entities/user';

export interface IRequest<BodyType = any | undefined> {
  body: BodyType;
  headers: {
    [key: string]: string | undefined;
  };
  pathParameters?: {
    [key: string]: string;
  };
  queryStringParameters?: {
    [key: string]: string;
  };
  requestContext?: {
    authorizer: User;
  };
}

export interface IResponse {
  statusCode: number;
  body: any;
}

export interface IController {
  handle(httpRequest: IRequest): Promise<IResponse>;
}
