import { DeleteDogUseCase } from '../../../src/app/useCases/deleteDog.useCase';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';

const saveSpy = jest.spyOn(MockDogRepository.prototype, 'save');

const mockDogRepository = new MockDogRepository();

describe('DeleteDogUseCase', () => {
  let deleteDogUseCase: DeleteDogUseCase;

  beforeEach(() => {
    deleteDogUseCase = new DeleteDogUseCase(mockDogRepository);
  });

  it('should delete a dog', async () => {
    await deleteDogUseCase.execute('1');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if dog is not found', async () => {
    await expect(() => deleteDogUseCase.execute('200')).rejects.toThrowError('Dog not found');
  });
});
