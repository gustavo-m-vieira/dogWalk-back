import { CreateTripUseCase } from '../useCases/createTrip.useCase';
import { GetAddressUseCase } from '../useCases/getAddress.useCase';
import { IRequest, IResponse, IController } from './IController';
import { DogTemperamentEnum } from '../enums';

interface IBody {
  addressId: string;
  dogType: DogTemperamentEnum;
  duration: number;
  slots: number;
  startDate: string;
}

interface IPath {
  userId: string;
}

export class CreateTripController implements IController {
  constructor(
    private readonly createTripUseCase: CreateTripUseCase,
    private readonly getAddressUseCase: GetAddressUseCase
  ) {}

  async handle(request: IRequest<IBody, IPath>): Promise<IResponse> {
    const { addressId, dogType, duration, slots, startDate } = request.body;
    const { userId: walkerId } = request.pathParameters;

    if (!addressId || !dogType || !duration || !slots || !startDate) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing required fields',
        },
      };
    }

    try {
      const address = await this.getAddressUseCase.execute({
        userId: walkerId,
        addressId,
      });

      const trip = await this.createTripUseCase.execute({
        addressId,
        dogType,
        duration,
        slots,
        startDate,
        walkerId,
      });

      return {
        statusCode: 201,
        body: {
          message: 'Trip created successfully',
          trip: {
            ...trip.toJSON(),
            address: address.toJSON(),
          },
        },
      };
    } catch (error) {
      if ((error as Error).message === 'User not found') {
        return {
          statusCode: 404,
          body: {
            message: 'User not found',
          },
        };
      }

      if ((error as Error).message === 'Address not found') {
        return {
          statusCode: 404,
          body: {
            message: 'Address not found',
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
