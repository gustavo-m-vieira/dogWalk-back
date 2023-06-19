import { DogTemperamentEnum } from '../../../src/app/enums';
import { CreateTripUseCase } from '../../../src/app/useCases/createTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

jest.mock('uuid', () => ({
  v4: () => 'b19d76b0-f19f-4911-a152-72dedbbee207',
}));

const mockTripRepository = new MockTripRepository();

describe('CreateTripUseCase', () => {
  let createTripUseCase: CreateTripUseCase;

  beforeEach(() => {
    createTripUseCase = new CreateTripUseCase(mockTripRepository);
  });

  it('should create a trip', async () => {
    const trip = await createTripUseCase.execute({
      walkerId: '1',
      addressId: '1',
      startDate: '2021-01-01T00:00:00.000Z',
      dogType: DogTemperamentEnum.SHY,
      duration: 30,
      slots: 5,
    });

    expect(trip.toJSON()).toStrictEqual({
      addressId: '1',
      createdAt: expect.any(String),
      deletedAt: undefined,
      dogType: 'SHY',
      dogs: [],
      duration: 30,
      id: 'b19d76b0-f19f-4911-a152-72dedbbee207',
      slots: 5,
      startDate: '2021-01-01T00:00:00.000Z',
      walkerId: '1',
    });
  });
});
