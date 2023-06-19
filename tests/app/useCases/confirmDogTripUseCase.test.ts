import { ConfirmDogTripUseCase } from '../../../src/app/useCases/confirmDogTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();

describe('ConfirmDogTripUseCase', () => {
  let confirmDogTripUseCase: ConfirmDogTripUseCase;

  beforeEach(() => {
    confirmDogTripUseCase = new ConfirmDogTripUseCase(mockTripRepository);
  });

  it('should confirm a dog in the trip', async () => {
    await confirmDogTripUseCase.execute('1', '1');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() => confirmDogTripUseCase.execute('200', '1')).rejects.toThrowError(
      'Trip not found'
    );
  });

  it('should throw an error if dog is not in trip', async () => {
    await expect(() => confirmDogTripUseCase.execute('1', '10')).rejects.toThrowError(
      'Dog not in trip'
    );
  });

  it('should throw an error if dog is already dropped', async () => {
    await expect(() => confirmDogTripUseCase.execute('3', '1')).rejects.toThrowError(
      'Dog already dropped'
    );
  });
});
