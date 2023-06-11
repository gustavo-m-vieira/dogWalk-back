import { Address } from '../../../src/app/entities/address';

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}));

describe('address entity', () => {
  test('should create a address', () => {
    const address = new Address(
      {
        street: 'any_street',
        number: 6,
        complement: 'any_complement',
        city: 'any_city',
        district: 'any_district',
        state: 'any_state',
        country: 'any_country',
        zipCode: 'any_zipCOde',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(address.toJSON()).toStrictEqual({
      street: 'any_street',
      number: 6,
      complement: 'any_complement',
      city: 'any_city',
      district: 'any_district',
      state: 'any_state',
      country: 'any_country',
      zipCode: 'any_zipCOde',
      createdAt: '2022-02-02T00:00:00.000Z',
      id: 'any_id',
      deletedAt: undefined,
    });
  });

  test('getters should return the correct values', () => {
    const address = new Address(
      {
        street: 'any_street',
        number: 6,
        complement: 'any_complement',
        city: 'any_city',
        district: 'any_district',
        state: 'any_state',
        country: 'any_country',
        zipCode: 'any_zipCOde',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(address.street).toBe('any_street');
    expect(address.number).toBe(6);
    expect(address.complement).toBe('any_complement');
    expect(address.city).toBe('any_city');
    expect(address.district).toBe('any_district');
    expect(address.state).toBe('any_state');
    expect(address.createdAt.toISOString()).toBe('2022-02-02T00:00:00.000Z');
    expect(address.deletedAt).toBeUndefined();
    expect(address.country).toBe('any_country');
    expect(address.zipCode).toBe('any_zipCOde');
  });

  test('softDelete should set the deletedAt property', () => {
    const address = new Address(
      {
        street: 'any_street',
        number: 6,
        complement: 'any_complement',
        city: 'any_city',
        district: 'any_district',
        state: 'any_state',
        country: 'any_country',
        zipCode: 'any_zipCOde',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    address.delete();

    expect(address.deletedAt).toBeDefined();
  });
});
