import { IRequest, IResponse, IController } from './IController';
import { AddDogToTripUseCase } from '../useCases/addDogToTrip.useCase';

interface IPath {
  tripId: string;
  dogId: string;
}

export class AddDogToTripController implements IController {
  constructor(private addDogToTripUseCase: AddDogToTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId, dogId } = request.pathParameters;

    try {
      const trip = await this.addDogToTripUseCase.execute(tripId, dogId);

      return {
        statusCode: 200,
        body: {
          message: 'Dog added to trip',
          trip: trip.toJSON(),
        },
      };
    } catch (error) {
      if (['Trip not found', 'Dog not found'].includes((error as Error).message)) {
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
