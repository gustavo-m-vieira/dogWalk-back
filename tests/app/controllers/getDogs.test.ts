import { GetDogsController } from '../../../src/app/controllers/getDogs.controller';
import { GetDogsUseCase } from '../../../src/app/useCases/getDogs.useCase';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

jest.mock('../../../src/app/useCases/getDogs.useCase');

const executeSpy = jest.spyOn(GetDogsUseCase.prototype, 'execute').mockResolvedValue([]);

const requester = new User(
  {
    name: 'any_name',
    email: 'any_email',
    telephone: 'any_telephone',
    passwordHash: 'any_password',
    role: UserRoleEnum.ADMIN,
    cpf: '47550151032',
    addresses: [],
  },
  { id: 'userId' }
);

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
        requestContext: {
          authorizer: requester,
        },
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
      requestContext: {
        authorizer: requester,
      },
    });

    expect(response).toStrictEqual({
      body: {
        message: 'Internal server error',
      },
      statusCode: 500,
    });
  });
});
