import { GetAddressUseCase } from '../../../src/app/useCases/getAddress.useCase';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';

const mockUserRepository = new MockUserRepository();

describe('GetAddressUseCase', () => {
  let getAddressUseCase: GetAddressUseCase;

  beforeEach(() => {
    getAddressUseCase = new GetAddressUseCase(mockUserRepository);
  });

  it('should get an address', async () => {
    const address = await getAddressUseCase.execute({ addressId: '1', userId: '4' });

    expect(address.toJSON()).toStrictEqual({
      id: '1',
      city: 'city',
      district: 'neighborhood',
      number: 1,
      state: 'state',
      street: 'street',
      zipCode: 'zipCode',
      country: 'country',
      deletedAt: undefined,
      createdAt: expect.any(String),
    });
  });

  it('should throw an error if user is not found', async () => {
    await expect(() =>
      getAddressUseCase.execute({ addressId: '200', userId: '100' })
    ).rejects.toThrowError('User not found');
  });

  it('should throw an error if address is not found', async () => {
    await expect(() =>
      getAddressUseCase.execute({ addressId: '200', userId: '1' })
    ).rejects.toThrowError('Address not found');
  });
});
