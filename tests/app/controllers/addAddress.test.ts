import { AddAddressUseCase } from '../../../src/app/useCases/addAddress.useCase';
import { Address } from '../../../src/app/entities/address';
import { MockUserRepository } from '../../../src/infrastructure/repositories/mock/user.repository';
import { AddAddressController } from '../../../src/app/controllers/addAddress.controller';

jest.mock('../../../src/app/useCases/addAddress.useCase');

const executeSpy = jest.spyOn(AddAddressUseCase.prototype, 'execute');

describe('AddAddressController', () => {
  let controller: AddAddressController;

  beforeEach(() => {
    controller = new AddAddressController(new AddAddressUseCase(new MockUserRepository()));
  });

  test('should return 400 if any parameter is missing', async () => {
    const response = await controller.handle({
      body: {
        street: 'Rua A',
        number: 123,
        complement: 'Casa',
        city: 'São Paulo',
        district: 'Centro',
        state: 'SP',
        country: 'Brasil',
      },
      pathParameters: {
        userId: '123',
      },
      headers: {},
      queryStringParameters: {},
    } as any);

    expect(response.statusCode).toBe(400);
    expect(response.body).toEqual({
      message: 'Missing parameters',
    });
  });

  test('should return 200 if address is added successfully', async () => {
    const address = new Address({
      street: 'Rua A',
      number: 123,
      complement: 'Casa',
      city: 'São Paulo',
      district: 'Centro',
      state: 'SP',
      country: 'Brasil',
      zipCode: '12345678',
    });

    executeSpy.mockResolvedValueOnce(address);

    const response = await controller.handle({
      body: {
        street: 'Rua A',
        number: 123,
        complement: 'Casa',
        city: 'São Paulo',
        district: 'Centro',
        state: 'SP',
        country: 'Brasil',
        zipCode: '12345678',
      },
      pathParameters: {
        userId: '123',
      },
      headers: {},
      queryStringParameters: {},
    });

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      message: 'Address added successfully',
      address: address.toJSON(),
    });
  });

  test('should return 404 if user is not found', async () => {
    executeSpy.mockRejectedValueOnce(new Error('User not found'));

    const response = await controller.handle({
      body: {
        street: 'Rua A',
        number: 123,
        complement: 'Casa',
        city: 'São Paulo',
        district: 'Centro',
        state: 'SP',
        country: 'Brasil',
        zipCode: '12345678',
      },
      pathParameters: {
        userId: '123',
      },
      headers: {},
      queryStringParameters: {},
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toEqual({
      message: 'User not found',
    });
  });

  test('should return 500 if any error occurs', async () => {
    executeSpy.mockRejectedValueOnce(new Error('Unexpected error'));

    const response = await controller.handle({
      body: {
        street: 'Rua A',
        number: 123,
        complement: 'Casa',
        city: 'São Paulo',
        district: 'Centro',
        state: 'SP',
        country: 'Brasil',
        zipCode: '12345678',
      },
      pathParameters: {
        userId: '123',
      },
      headers: {},
      queryStringParameters: {},
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toEqual({
      message: 'Internal server error',
    });
  });
});
