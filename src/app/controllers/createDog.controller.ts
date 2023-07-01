import { CreateDogUseCase } from '../useCases/createDog.useCase';
import type { IController, IRequest, IResponse } from './IController';
import type { DogSizeEnum, DogTemperamentEnum } from '../enums';

interface IBody {
  name: string;
  breed: string;
  size: DogSizeEnum;
  birthDate: string;
  temperament: DogTemperamentEnum;
  tutorId: string;
  image?: string;
}

export class CreateDogController implements IController {
  constructor(private readonly createDogUseCase: CreateDogUseCase) {}

  async handle(request: IRequest<IBody>): Promise<IResponse> {
    const { name, breed, size, birthDate, temperament, tutorId, image } = request.body;

    const { authorizer: requester } = request.requestContext!;

    if (!name || !breed || !size || !birthDate || !temperament || !tutorId) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing required fields',
        },
      };
    }

    try {
      const dog = await this.createDogUseCase.execute({
        name,
        breed,
        size,
        birthDate,
        temperament,
        tutorId,
        image,
        requester,
      });

      return {
        statusCode: 201,
        body: dog.toJSON(),
      };
    } catch (error) {
      console.error(error);

      if ((error as Error).message === 'Tutor not found') {
        return {
          statusCode: 404,
          body: {
            message: 'Tutor not found',
          },
        };
      }

      if ((error as Error).message === 'You cannot add a dog to another tutor') {
        return {
          statusCode: 403,
          body: {
            message: 'You cannot add a dog to another tutor',
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
