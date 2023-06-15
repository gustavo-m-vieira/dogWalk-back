import { GetDogsUseCase } from '../useCases/getDogs.useCase';
import type { IController, IResponse } from './IController';

export class GetDogsController implements IController {
  constructor(private readonly listDogsUseCase: GetDogsUseCase) {}

  async handle(): Promise<IResponse> {
    const dogs = await this.listDogsUseCase.execute();

    return {
      statusCode: 200,
      body: {
        message: 'Dogs fetched successfully',
        dogs,
      },
    };
  }
}
