import { DeleteDogUseCase } from '../../../src/app/useCases/deleteDog.useCase';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';
import { UserRoleEnum } from '../../../src/app/enums';
import { User } from '../../../src/app/entities/user';

const saveSpy = jest.spyOn(MockDogRepository.prototype, 'save');

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

describe('DeleteDogUseCase', () => {
  let deleteDogUseCase: DeleteDogUseCase;

  beforeEach(() => {
    deleteDogUseCase = new DeleteDogUseCase(mockDogRepository);
  });

  it('should delete a dog', async () => {
    await deleteDogUseCase.execute({ dogId: '1', requester });

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if dog is not found', async () => {
    await expect(() => deleteDogUseCase.execute({ dogId: '200', requester })).rejects.toThrowError(
      'Dog not found'
    );
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      deleteDogUseCase.execute({
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
    ).rejects.toThrow('You cannot delete another user dog');
  });
});
