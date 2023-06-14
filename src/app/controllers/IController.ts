import { User } from '../entities/user';

export interface IRequest<
  BodyType = any | undefined,
  PathType = any | undefined,
  QueryType = any | undefined
> {
  body: BodyType;
  headers: {
    [key: string]: string | undefined;
  };
  pathParameters: PathType;
  queryStringParameters: QueryType;
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
