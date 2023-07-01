import { AddDogToTripUseCase } from '../../../src/app/useCases/addDogToTrip.useCase';
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

describe('AddDogToTripUseCase', () => {
  let addDogToTripUseCase: AddDogToTripUseCase;

  beforeEach(() => {
    addDogToTripUseCase = new AddDogToTripUseCase(mockTripRepository, mockDogRepository);
  });

  it('should add a dog to a trip', async () => {
    await addDogToTripUseCase.execute({ tripId: '1', dogId: '2', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() =>
      addDogToTripUseCase.execute({ tripId: '200', dogId: '1', requester })
    ).rejects.toThrowError('Trip not found');
  });

  it('should throw an error if dog is not found', async () => {
    await expect(() =>
      addDogToTripUseCase.execute({ tripId: '1', dogId: '200', requester })
    ).rejects.toThrowError('Dog not found');
  });

  it('should be ok if dog is already in the trip', async () => {
    await addDogToTripUseCase.execute({ tripId: '1', dogId: '2', requester });
    await addDogToTripUseCase.execute({ tripId: '1', dogId: '2', requester });
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      addDogToTripUseCase.execute({
        tripId: '1',
        dogId: '2',
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
    ).rejects.toThrow('You are not the tutor of this dog');
  });
});
