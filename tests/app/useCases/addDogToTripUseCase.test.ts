import { AddDogToTripUseCase } from '../../../src/app/useCases/addDogToTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';
import { MockDogRepository } from '../../../src/infrastructure/repositories/mock/dog.repository';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();
const mockDogRepository = new MockDogRepository();

describe('AddDogToTripUseCase', () => {
  let addDogToTripUseCase: AddDogToTripUseCase;

  beforeEach(() => {
    addDogToTripUseCase = new AddDogToTripUseCase(mockTripRepository, mockDogRepository);
  });

  it('should add a dog to a trip', async () => {
    await addDogToTripUseCase.execute('1', '2');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() => addDogToTripUseCase.execute('200', '1')).rejects.toThrowError(
      'Trip not found'
    );
  });

  it('should throw an error if dog is not found', async () => {
    await expect(() => addDogToTripUseCase.execute('1', '200')).rejects.toThrowError(
      'Dog not found'
    );
  });

  it('should be ok if dog is already in the trip', async () => {
    await addDogToTripUseCase.execute('1', '2');
    await addDogToTripUseCase.execute('1', '2');
  });
});
