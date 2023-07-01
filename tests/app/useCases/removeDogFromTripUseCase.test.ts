import { RemoveDogFromTripUseCase } from '../../../src/app/useCases/removeDogFromTrip.useCase';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();
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

describe('RemoveDogFromTripUseCase', () => {
  let removeDogFromTripUseCase: RemoveDogFromTripUseCase;

  beforeEach(() => {
    removeDogFromTripUseCase = new RemoveDogFromTripUseCase(mockTripRepository, mockDogRepository);
  });

  it('should remove a dog from the trip', async () => {
    await removeDogFromTripUseCase.execute({ tripId: '1', dogId: '1', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() =>
      removeDogFromTripUseCase.execute({ tripId: '200', dogId: '1', requester })
    ).rejects.toThrowError('Trip not found');
  });

  it('should be ok if dog is not in the trip', async () => {
    await removeDogFromTripUseCase.execute({ tripId: '1', dogId: '2', requester });
    await removeDogFromTripUseCase.execute({ tripId: '1', dogId: '2', requester });
  });
});
