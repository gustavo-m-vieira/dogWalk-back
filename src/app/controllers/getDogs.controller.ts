import type { IController, IResponse } from './IController';

export class GetDogsController implements IController {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor, @typescript-eslint/no-empty-function
  constructor() {}

  // eslint-disable-next-line class-methods-use-this
  async handle(): Promise<IResponse> {
    return {
      statusCode: 200,
      body: {
        message: 'Dogs fetched successfully',
      },
    };
  }
}
