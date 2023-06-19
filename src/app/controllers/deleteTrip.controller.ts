import { DeleteTripUseCase } from '../useCases/deleteTrip.useCase';
import { IRequest, IResponse, IController } from './IController';

interface IPath {
  tripId: string;
}

export class DeleteTripController implements IController {
  constructor(private deleteTripUseCase: DeleteTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId } = request.pathParameters;

    try {
      await this.deleteTripUseCase.execute(tripId);

      return {
        statusCode: 200,
        body: {
          message: 'Trip deleted successfully',
        },
      };
    } catch (error) {
      console.log(error);

      if ((error as Error).message === 'Trip not found') {
        return {
          statusCode: 404,
          body: {
            message: 'Trip not found',
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
