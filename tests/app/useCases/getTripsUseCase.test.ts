import { GetTripsUseCase } from '../../../src/app/useCases/getTrips.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

describe('GetTripsUseCase', () => {
  let getTripsUseCase: GetTripsUseCase;

  beforeEach(() => {
    getTripsUseCase = new GetTripsUseCase(new MockTripRepository());
  });

  it('should return an array of trips of walkerId', async () => {
    const trips = await getTripsUseCase.execute({ date: new Date(), walkerId: '1' });

    expect(trips.length).toBe(4);
  });

  it('should return an array with no filters', async () => {
    const trips = await getTripsUseCase.execute({} as any);

    expect(trips.length).toBe(4);
  });

  it('should return an array of trips of zipCode', async () => {
    const trips = await getTripsUseCase.execute({ date: new Date(), zipCode: '1' });

    expect(trips.length).toBe(4);
  });
});
