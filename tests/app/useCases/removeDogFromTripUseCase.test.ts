import { RemoveDogFromTripUseCase } from '../../../src/app/useCases/removeDogFromTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();

describe('RemoveDogFromTripUseCase', () => {
  let removeDogFromTripUseCase: RemoveDogFromTripUseCase;

  beforeEach(() => {
    removeDogFromTripUseCase = new RemoveDogFromTripUseCase(mockTripRepository);
  });

  it('should remove a dog from the trip', async () => {
    await removeDogFromTripUseCase.execute('1', '1');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() => removeDogFromTripUseCase.execute('200', '1')).rejects.toThrowError(
      'Trip not found'
    );
  });

  it('should be ok if dog is not in the trip', async () => {
    await removeDogFromTripUseCase.execute('1', '2');
    await removeDogFromTripUseCase.execute('1', '2');
  });
});
