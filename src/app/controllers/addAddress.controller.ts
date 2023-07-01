import type { IController, IRequest, IResponse } from './IController';
import { AddAddressUseCase } from '../useCases/addAddress.useCase';

interface IBody {
  street: string;
  number: number;
  complement?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
}

export interface IPathParameters {
  userId: string;
}

export class AddAddressController implements IController {
  constructor(private addAddressUseCase: AddAddressUseCase) {}

  async handle(request: IRequest<IBody, IPathParameters>): Promise<IResponse> {
    const { street, number, complement, city, district, state, country, zipCode } = request.body;

    const { userId } = request.pathParameters;

    const { authorizer: requester } = request.requestContext!;

    if (!street || !number || !city || !district || !state || !country || !zipCode || !userId) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing parameters',
        },
      };
    }

    try {
      const address = await this.addAddressUseCase.execute({
        street,
        number,
        complement,
        city,
        district,
        state,
        country,
        zipCode,
        userId,
        requester,
      });

      return {
        statusCode: 200,
        body: {
          message: 'Address added successfully',
          address: address.toJSON(),
        },
      };
    } catch (error) {
      console.log({ error });

      if ((error as Error).message === 'User not found') {
        return {
          statusCode: 404,
          body: {
            message: 'User not found',
          },
        };
      }

      if ((error as Error).message === 'You are not allowed to add an address to another user') {
        return {
          statusCode: 403,
          body: {
            message: 'You are not allowed to add an address to another user',
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
