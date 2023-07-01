import { GetTripsUseCase } from '../../../src/app/useCases/getTrips.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

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

describe('GetTripsUseCase', () => {
  let getTripsUseCase: GetTripsUseCase;

  beforeEach(() => {
    getTripsUseCase = new GetTripsUseCase(new MockTripRepository());
  });

  it('should return an array of trips of walkerId', async () => {
    const trips = await getTripsUseCase.execute({ date: new Date(), walkerId: '1', requester });

    expect(trips.length).toBe(2);
  });

  it('should return an array with no filters', async () => {
    const trips = await getTripsUseCase.execute({ requester } as any);

    expect(trips.length).toBe(4);
  });

  it('should return an array of trips of zipCode', async () => {
    const trips = await getTripsUseCase.execute({ date: new Date(), zipCode: '1', requester });

    expect(trips.length).toBe(4);
  });
});
