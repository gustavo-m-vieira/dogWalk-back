import { ConfirmDogTripUseCase } from '../../../src/app/useCases/confirmDogTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

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

describe('ConfirmDogTripUseCase', () => {
  let confirmDogTripUseCase: ConfirmDogTripUseCase;

  beforeEach(() => {
    confirmDogTripUseCase = new ConfirmDogTripUseCase(mockTripRepository);
  });

  it('should confirm a dog in the trip', async () => {
    await confirmDogTripUseCase.execute({ tripId: '1', dogId: '1', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() =>
      confirmDogTripUseCase.execute({ tripId: '200', dogId: '1', requester })
    ).rejects.toThrowError('Trip not found');
  });

  it('should throw an error if dog is not in trip', async () => {
    await expect(() =>
      confirmDogTripUseCase.execute({ tripId: '1', dogId: '10', requester })
    ).rejects.toThrowError('Dog not in trip');
  });

  it('should throw an error if dog is already dropped', async () => {
    await expect(() =>
      confirmDogTripUseCase.execute({ tripId: '3', dogId: '1', requester })
    ).rejects.toThrowError('Dog already dropped');
  });
});
