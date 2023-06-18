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

    try {
      const trip = await this.removeDogFromTripUseCase.execute(tripId, dogId);

      return {
        statusCode: 200,
        body: {
          message: 'Dog removed from trip',
          trip: trip.toJSON(),
        },
      };
    } catch (error) {
      if (['Trip not found'].includes((error as Error).message)) {
        return {
          statusCode: 404,
          body: {
            message: (error as Error).message,
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
