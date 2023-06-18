import { UserRoleEnum } from '../enums';
import { CreateUserUseCase } from '../useCases/createUser.useCase';
import type { IController, IRequest, IResponse } from './IController';

interface IBody {
  name: string;
  email: string;
  cpf: string;
  telephone: string;
  password: string;
  role: UserRoleEnum;
}

export class CreateUserController implements IController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  async handle(request: IRequest<IBody>): Promise<IResponse> {
    const { name, email, cpf, telephone, password, role } = request.body;

    if (!name || !email || !cpf || !telephone || !password || !role) {
      return {
        statusCode: 400,
        body: {
          message: 'Missing parameters',
        },
      };
    }

    if (
      role !== UserRoleEnum.TUTOR &&
      role !== UserRoleEnum.WALKER &&
      role !== UserRoleEnum.ADMIN
    ) {
      return {
        statusCode: 400,
        body: {
          message: 'Invalid role',
        },
      };
    }

    try {
      const user = await this.createUserUseCase.execute({
        name,
        email,
        cpf,
        telephone,
        password,
        role,
      });

      return {
        statusCode: 200,
        body: {
          message: 'User created successfully',
          user: user.toJSON(),
        },
      };
    } catch (error) {
      console.error({ error });

      if ((error as Error).message === 'Email already in use') {
        return {
          statusCode: 409,
          body: {
            message: 'Email already in use',
          },
        };
      }

      return {
        statusCode: 500,
        body: {
          message: 'Internal Server Error',
        },
      };
    }
  }
}
