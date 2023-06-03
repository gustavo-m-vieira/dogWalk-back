import { IController, IRequest, IResponse } from './IController';
import { AuthenticateUseCase } from '../useCases/authenticate.useCase';

export class AuthenticateController implements IController {
  constructor(private readonly authenticateUseCase: AuthenticateUseCase) {}

  async handle(request: IRequest): Promise<IResponse> {
    const { email, password } = request.body;

    if (!email || !password)
      return {
        statusCode: 400,
        body: {
          message: 'Missing parameters',
        },
      };

    try {
      const token = await this.authenticateUseCase.execute(email, password);

      return {
        statusCode: 200,
        body: {
          token,
        },
      };
    } catch (error) {
      console.log({ error });

      return {
        statusCode: 400,
        body: {
          message: 'Invalid credentials',
        },
      };
    }
  }
}
