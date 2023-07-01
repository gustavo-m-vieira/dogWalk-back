import { GetTripUseCase } from '../../../src/app/useCases/getTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

const mockTripRepository = new MockTripRepository();
const mockUserRepository = new MockUserRepository();
const mockDogRepository = new MockDogRepository();

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

describe('GetTripUseCase', () => {
  let getTripUseCase: GetTripUseCase;

  beforeEach(() => {
    getTripUseCase = new GetTripUseCase(mockTripRepository, mockDogRepository, mockUserRepository);
  });

  it('should get a trip', async () => {
    const trip = await getTripUseCase.execute({ tripId: '3', requester });

    expect(trip).toStrictEqual({
      address: {
        UserId: undefined,
        city: 'city',
        country: 'country',
        createdAt: undefined,
        deletedAt: undefined,
        district: 'neighborhood',
        id: '1',
        number: 1,
        state: 'state',
        street: 'street',
        zipCode: 'zipCode',
      },
      addressId: '1',
      createdAt: '2021-01-01T00:00:00.000Z',
      deletedAt: undefined,
      dogType: 'SHY',
      dogs: [
        {
          birthDate: '2021-01-01T00:00:00.000Z',
          breed: 'Labrador',
          caughtAt: '2021-01-01T00:00:00.000Z',
          createdAt: '2021-01-01T00:00:00.000Z',
          deletedAt: undefined,
          droppedAt: '2021-01-01T00:00:00.000Z',
          id: '1',
          name: 'Buddy',
          size: 'MEDIUM',
          temperament: 'SHY',
          tutorId: '1',
          image: undefined,
        },
      ],
      duration: 30,
      id: '3',
      slots: 2,
      startDate: '2021-01-01T00:00:00.000Z',
      walker: {
        id: '4',
        name: 'John Doe',
      },
      walkerId: '4',
    });
  });

  it('should throw an error if trip is not found', async () => {
    await expect(getTripUseCase.execute({ tripId: '5', requester })).rejects.toThrow(
      'Trip not found'
    );
  });

  it('should throw an error if walker is not found', async () => {
    await expect(getTripUseCase.execute({ tripId: '4', requester })).rejects.toThrow(
      'Walker not found'
    );
  });
});
