import { DogTemperamentEnum, UserRoleEnum } from '../../../src/app/enums';
import { CreateTripUseCase } from '../../../src/app/useCases/createTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { User } from '../../../src/app/entities/user';

jest.mock('uuid', () => ({
  v4: () => 'b19d76b0-f19f-4911-a152-72dedbbee207',
}));

const mockTripRepository = new MockTripRepository();

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
      requester,
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

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      createTripUseCase.execute({
        walkerId: '1',
        addressId: '1',
        startDate: '2021-01-01T00:00:00.000Z',
        dogType: DogTemperamentEnum.SHY,
        duration: 30,
        slots: 5,
        requester: new User(
          {
            name: 'any_name',
            email: 'any_email',
            telephone: 'any_telephone',
            passwordHash: 'any_password',
            role: UserRoleEnum.WALKER,
            cpf: '47550151032',
            addresses: [],
          },
          { id: 'anotherUserId' }
        ),
      })
    ).rejects.toThrow('Cannot create trip for another user');
  });
});
