import { GetDogsController } from '../../../src/app/controllers/getDogs.controller';
import { GetDogsUseCase } from '../../../src/app/useCases/getDogs.useCase';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';

jest.mock('../../../src/app/useCases/getDogs.useCase');

const executeSpy = jest.spyOn(GetDogsUseCase.prototype, 'execute').mockResolvedValue([]);

describe('GetDogsController', () => {
  let getDogsController: GetDogsController;

  beforeEach(() => {
    getDogsController = new GetDogsController(new GetDogsUseCase(new MockDogRepository()));
  });

  describe('getDogs', () => {
    it('should return a list of dogs', async () => {
      const response = await getDogsController.handle({
        body: {},
        headers: {},
        pathParameters: undefined,
        queryStringParameters: {},
      });

      expect(response).toStrictEqual({
        body: {
          message: 'Dogs fetched successfully',
          dogs: [],
        },
        statusCode: 200,
      });
    });
  });

  it('should return 500', async () => {
    executeSpy.mockRejectedValueOnce(new Error());

    const response = await getDogsController.handle({
      body: {},
      headers: {},
      pathParameters: undefined,
      queryStringParameters: {},
    });

    expect(response).toStrictEqual({
      body: {
        message: 'Internal server error',
      },
      statusCode: 500,
    });
  });
});
