import { GetDogsUseCase } from '../useCases/getDogs.useCase';
import type { IController, IRequest, IResponse } from './IController';

interface IQuery {
  tutorId?: string;
}

export class GetDogsController implements IController {
  constructor(private readonly getDogsUseCase: GetDogsUseCase) {}

  async handle(request: IRequest<any, undefined, IQuery>): Promise<IResponse> {
    const { tutorId } = request.queryStringParameters;

    const { authorizer: requester } = request.requestContext!;

    try {
      const dogs = await this.getDogsUseCase.execute({ tutorId, requester });

      return {
        statusCode: 200,
        body: {
          message: 'Dogs fetched successfully',
          dogs,
        },
      };
    } catch (error) {
      console.error(error);

      if ((error as Error).message === 'You cannot get another user dogs') {
        return {
          statusCode: 403,
          body: {
            message: 'You cannot get another user dogs',
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      };
    }
  }
}
