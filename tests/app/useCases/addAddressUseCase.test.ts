import { AddAddressUseCase } from '../../../src/app/useCases/addAddress.useCase';
import { Address } from '../../../src/app/entities/address';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';
import { User } from '../../../src/app/entities/user';
import { UserRoleEnum } from '../../../src/app/enums';

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

const findByIdSpy = jest
  .spyOn(MockUserRepository.prototype, 'findById')
  .mockResolvedValue(requester);

describe('AddAddressUseCase', () => {
  const mockUserRepository = new MockUserRepository();
  const useCase = new AddAddressUseCase(mockUserRepository);

  it('should add an address to a user', async () => {
    const address = await useCase.execute({
      city: 'city',
      country: 'country',
      number: 1,
      state: 'state',
      street: 'street',
      zipCode: 'zipCode',
      userId: 'userId',
      district: 'district',
      requester,
    });

    expect(address).toBeInstanceOf(Address);
    expect(findByIdSpy).toBeCalledTimes(1);
  });

  it('should throw an error if user is not found', async () => {
    findByIdSpy.mockResolvedValueOnce(undefined);

    expect(() =>
      useCase.execute({
        city: 'city',
        country: 'country',
        number: 1,
        state: 'state',
        street: 'street',
        zipCode: 'zipCode',
        userId: 'userId',
        district: 'district',
        requester,
      })
    ).rejects.toThrow('User not found');
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      useCase.execute({
        city: 'city',
        country: 'country',
        number: 1,
        state: 'state',
        street: 'street',
        zipCode: 'zipCode',
        userId: 'userId',
        district: 'district',
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
    ).rejects.toThrow('You are not allowed to add an address to another user');
  });
});
