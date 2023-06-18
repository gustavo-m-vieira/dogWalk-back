import type { IController, IRequest, IResponse } from './IController';
import { GetTripsUseCase } from '../useCases/getTrips.useCase';

interface IQuery {
  walkerId?: string;
  startDate: string;
  zipCode?: string;
}

export class GetTripsController implements IController {
  constructor(private readonly getTripsUseCase: GetTripsUseCase) {}

  async handle(request: IRequest<any, undefined, IQuery>): Promise<IResponse> {
    const { walkerId, startDate, zipCode } = request.queryStringParameters;

    if (!startDate) {
      return {
        statusCode: 400,
        body: {
          message: 'startDate is required',
        },
      };
    }

    try {
      const trips = await this.getTripsUseCase.execute({
        walkerId,
        date: new Date(startDate),
        zipCode,
      });

      return {
        statusCode: 200,
        body: {
          trips: trips.map((trip) => trip.toJSON()),
        },
      };
    } catch (error) {
      console.error(error);

      return {
        statusCode: 500,
        body: {
          message: 'Internal server error',
        },
      };
    }
  }
}
