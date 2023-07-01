import { IRequest, IResponse, IController } from './IController';
import { RemoveDogFromTripUseCase } from '../useCases/removeDogFromTrip.useCase';

interface IPath {
  tripId: string;
  dogId: string;
}

export class RemoveDogFromTripController implements IController {
  constructor(private removeDogFromTripUseCase: RemoveDogFromTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId, dogId } = request.pathParameters;

    const { authorizer: requester } = request.requestContext!;

    try {
      const trip = await this.removeDogFromTripUseCase.execute({ tripId, dogId, requester });

      return {
        statusCode: 200,
        body: {
          message: 'Dog removed from trip',
          trip: trip.toJSON(),
        },
      };
    } catch (error) {
      console.error(error);

      if (['Trip not found', 'Dog not found'].includes((error as Error).message)) {
        return {
          statusCode: 404,
          body: {
            message: (error as Error).message,
          },
        };
      }

      if ((error as Error).message === 'You cannot remove another user dog') {
        return {
          statusCode: 403,
          body: {
            message: 'You cannot remove another user dog',
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
