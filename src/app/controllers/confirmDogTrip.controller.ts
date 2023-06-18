import { ConfirmDogTripUseCase } from '../useCases/confirmDogTrip.useCase';
import { IController, IRequest, IResponse } from './IController';

interface IPath {
  tripId: string;
  dogId: string;
}

export class ConfirmDogTripController implements IController {
  constructor(private readonly confirmDogTripUseCase: ConfirmDogTripUseCase) {}

  async handle(request: IRequest<any, IPath>): Promise<IResponse> {
    const { tripId, dogId } = request.pathParameters;

    if (!tripId || !dogId) return { statusCode: 400, body: { message: 'Missing parameters' } };

    try {
      await this.confirmDogTripUseCase.execute(tripId, dogId);

      return {
        statusCode: 200,
        body: {
          message: 'Dog confirmed',
        },
      };
    } catch (error) {
      console.log(error);

      if (
        ['Trip not found', 'Dog not in trip', 'Dog already dropped'].includes(
          (error as Error).message
        )
      ) {
        return {
          statusCode: 400,
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
