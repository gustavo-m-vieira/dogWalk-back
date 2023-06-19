import { ReturnDogFromTripUseCase } from '../../../src/app/useCases/returnDogFromTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();

describe('ReturnDogFromTripUseCase', () => {
  let returnDogFromTripUseCase: ReturnDogFromTripUseCase;

  beforeEach(() => {
    returnDogFromTripUseCase = new ReturnDogFromTripUseCase(mockTripRepository);
  });

  it('should return a dog from the trip', async () => {
    await returnDogFromTripUseCase.execute('4', '1');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() => returnDogFromTripUseCase.execute('200', '1')).rejects.toThrowError(
      'Trip not found'
    );
  });

  it('should throw an error if dog is not in trip', async () => {
    await expect(() => returnDogFromTripUseCase.execute('1', '10')).rejects.toThrowError(
      'Dog not in trip'
    );
  });

  it('should throw an error if dog is not caught', async () => {
    await expect(() => returnDogFromTripUseCase.execute('1', '1')).rejects.toThrowError(
      'Dog not caught'
    );
  });
});
