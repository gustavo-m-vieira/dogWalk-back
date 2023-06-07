import { IController } from './IController';

export class HealthCheckController implements IController {
  // eslint-disable-next-line class-methods-use-this
  async handle(): Promise<any> {
    return {
      statusCode: 200,
    };
  }
}
