import { ReturnDogFromTripUseCase } from '../../../src/app/useCases/returnDogFromTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';
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

describe('ReturnDogFromTripUseCase', () => {
  let returnDogFromTripUseCase: ReturnDogFromTripUseCase;

  beforeEach(() => {
    returnDogFromTripUseCase = new ReturnDogFromTripUseCase(mockTripRepository, mockDogRepository);
  });

  it('should return a dog from the trip', async () => {
    await returnDogFromTripUseCase.execute({ tripId: '4', dogId: '1', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() =>
      returnDogFromTripUseCase.execute({ tripId: '200', dogId: '1', requester })
    ).rejects.toThrowError('Trip not found');
  });

  it('should throw an error if dog is not in trip', async () => {
    await expect(() =>
      returnDogFromTripUseCase.execute({ tripId: '1', dogId: '10', requester })
    ).rejects.toThrowError('Dog not in trip');
  });

  it('should throw an error if dog is not caught', async () => {
    await expect(() =>
      returnDogFromTripUseCase.execute({ tripId: '1', dogId: '1', requester })
    ).rejects.toThrowError('Dog not caught');
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      returnDogFromTripUseCase.execute({
        tripId: '4',
        dogId: '1',
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
    ).rejects.toThrow('You cannot return a dog from a trip that is not yours');
  });
});
