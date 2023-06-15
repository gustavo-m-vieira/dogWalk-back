import { DeleteDogUseCase } from '../useCases/deleteDog.useCase';
import { IRequest, IResponse, IController } from './IController';

export interface IPath {
  dogId: string;
}

export class DeleteDogController implements IController {
  constructor(private deleteDogUseCase: DeleteDogUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { dogId } = request.pathParameters;

    try {
      const dog = await this.deleteDogUseCase.execute(dogId);

      return {
        statusCode: 200,
        body: {
          message: 'Dog deleted successfully',
          dog,
        },
      };
    } catch (error) {
      if ((error as Error).message === 'Dog not found') {
        return {
          statusCode: 404,
          body: {
            message: 'Dog not found',
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
