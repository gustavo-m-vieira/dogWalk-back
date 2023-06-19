import { DeleteTripUseCase } from '../../../src/app/useCases/deleteTrip.useCase';
import { MockTripRepository } from '../../../src/infrastructure/repositories/mock/trip.repository';

const saveSpy = jest.spyOn(MockTripRepository.prototype, 'save');

const mockTripRepository = new MockTripRepository();

describe('DeleteTripUseCase', () => {
  let deleteTripUseCase: DeleteTripUseCase;

  beforeEach(() => {
    deleteTripUseCase = new DeleteTripUseCase(mockTripRepository);
  });

  it('should delete a trip', async () => {
    await deleteTripUseCase.execute('1');

    expect(saveSpy).toHaveBeenCalled();
  });

  it('should throw an error if trip is not found', async () => {
    await expect(() => deleteTripUseCase.execute('200')).rejects.toThrowError('Trip not found');
  });
});
