import { IRequest, IResponse, IController } from './IController';
import { GetTripUseCase } from '../useCases/getTrip.useCase';

export interface IPath {
  tripId: string;
}

export class GetTripController implements IController {
  constructor(private getTripUseCase: GetTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId } = request.pathParameters;

    try {
      const trip = await this.getTripUseCase.execute(tripId);

      return {
        statusCode: 200,
        body: {
          message: 'Trip found successfully.',
          trip,
        },
      };
    } catch (error) {
      console.error(error);

      if (['Trip not found', 'Walker not found'].includes((error as Error).message)) {
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
          message: 'Internal server error.',
        },
      };
    }
  }
}
