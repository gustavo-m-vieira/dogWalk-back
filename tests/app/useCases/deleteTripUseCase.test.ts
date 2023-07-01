import { DeleteTripUseCase } from '../../../src/app/useCases/deleteTrip.useCase';
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

describe('DeleteTripUseCase', () => {
  let deleteTripUseCase: DeleteTripUseCase;

  beforeEach(() => {
    deleteTripUseCase = new DeleteTripUseCase(mockTripRepository);
  });

  it('should delete a trip', async () => {
    await deleteTripUseCase.execute({ tripId: '1', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() =>
      deleteTripUseCase.execute({ tripId: '200', requester })
    ).rejects.toThrowError('Trip not found');
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      deleteTripUseCase.execute({
        tripId: '1',
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
    ).rejects.toThrow('You cannot delete another user trip');
  });
});
