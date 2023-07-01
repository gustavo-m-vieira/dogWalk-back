import { ReturnDogFromTripUseCase } from '../useCases/returnDogFromTrip.useCase';
import { IController, IRequest, IResponse } from './IController';

interface IPath {
  tripId: string;
  dogId: string;
}

export class ReturnDogFromTripController implements IController {
  constructor(private readonly returnDogFromTripUseCase: ReturnDogFromTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId, dogId } = request.pathParameters;

    const { authorizer: requester } = request.requestContext!;

    if (!tripId || !dogId) return { statusCode: 400, body: { message: 'Missing parameters' } };

    try {
      await this.returnDogFromTripUseCase.execute({ tripId, dogId, requester });

      return {
        statusCode: 200,
        body: {
          message: 'Dog returned',
        },
      };
    } catch (error) {
      console.error(error);

      if (['Dog not in trip', 'Dog not caught'].includes((error as Error).message)) {
        return {
          statusCode: 400,
          body: {
            message: (error as Error).message,
          },
        };
      }

      if (['Trip not found', 'Dog not found'].includes((error as Error).message)) {
        return {
          statusCode: 404,
          body: {
            message: (error as Error).message,
          },
        };
      }

      if ((error as Error).message === 'You cannot return a dog from a trip that is not yours') {
        return {
          statusCode: 403,
          body: {
            message: 'You cannot return a dog from a trip that is not yours',
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
