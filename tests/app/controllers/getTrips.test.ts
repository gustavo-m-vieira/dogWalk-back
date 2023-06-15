import { GetTripsController } from '../../../src/app/controllers/getTrips.controller';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { GetTripsUseCase } from '../../../src/app/useCases/getTrips.useCase';
import { Trip } from '../../../src/app/entities/trip';
import { DogTemperamentEnum } from '../../../src/app/enums';

jest.mock('../../../src/app/useCases/getTrips.useCase');

const executeSpy = jest.spyOn(GetTripsUseCase.prototype, 'execute');

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
        dogs: ['1'],
        addressId: '1',
      }),
    ]);

    const response = await getTripsController.handle({
      pathParameters: undefined,
      queryStringParameters: { startDate: '2022-01-01', walkerId: '1' },
      body: {},
      headers: {},
    });

    expect(response.statusCode).toBe(200);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });

  it('should return 400 when missing date', async () => {
    const response = await getTripsController.handle({
      pathParameters: undefined,
      queryStringParameters: {} as any,
      body: {},
      headers: {},
    });

    expect(response.statusCode).toBe(400);
    expect(executeSpy).toHaveBeenCalledTimes(0);
  });

  it('should return 500 when error', async () => {
    executeSpy.mockImplementationOnce(() => {
      throw new Error();
    });

    const response = await getTripsController.handle({
      pathParameters: undefined,
      queryStringParameters: { startDate: '2022-01-01', walkerId: '1' },
      body: {},
      headers: {},
    });

    expect(response.statusCode).toBe(500);
    expect(executeSpy).toHaveBeenCalledTimes(1);
  });
});
