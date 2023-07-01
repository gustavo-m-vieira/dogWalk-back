import { GetTripsController } from '../../../src/app/controllers/getTrips.controller';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { GetTripsUseCase } from '../../../src/app/useCases/getTrips.useCase';
import { Trip } from '../../../src/app/entities/trip';
import { DogTemperamentEnum, UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

jest.mock('../../../src/app/useCases/getTrips.useCase');

const executeSpy = jest.spyOn(GetTripsUseCase.prototype, 'execute');

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

describe('GetTripsController', () => {
  let getTripsController: GetTripsController;

  beforeEach(() => {
    getTripsController = new GetTripsController(new GetTripsUseCase(new MockTripRepository()));
  });

  it('should return 200', async () => {
    executeSpy.mockResolvedValueOnce([
      new Trip({
        startDate: new Date('2021-01-01T12:00:00'),
        duration: 60,
        slots: 1,
        dogType: DogTemperamentEnum.SHY,
        walkerId: '1',
        dogs: [{ id: '1' }],
        addressId: '1',
      }),
    ]);

    const response = await getTripsController.handle({
      pathParameters: undefined,
      queryStringParameters: { startDate: '2022-01-01', walkerId: '1' },
      body: {},
      headers: {},
      requestContext: {
        authorizer: requester,
      },
    });

    expect(response.statusCode).toBe(200);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should return 500 when error', async () => {
    executeSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await getTripsController.handle({
      pathParameters: undefined,
      queryStringParameters: { walkerId: '1' },
      body: {},
      headers: {},
      requestContext: {
        authorizer: requester,
      },
    });

    expect(response.statusCode).toBe(500);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
