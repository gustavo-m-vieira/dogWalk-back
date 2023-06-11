import { User } from '../../../src/app/entities/user';
import { Address } from '../../../src/app/entities/address';
import { UserRoleEnum } from '../../../src/app/enums';

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}));

describe('User Entity', () => {
  test('should create a user', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(user.toJSON()).toStrictEqual({
      id: 'any_id',
      name: 'any_name',
      email: 'any_email',
      telephone: 'any_telephone',

      role: 'ADMIN',
      createdAt: '2022-02-02T00:00:00.000Z',
      cpf: '47550151032',
      addresses: [],
      deletedAt: undefined,
    });
  });

  test('getters should return the correct values', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(user.id).toBe('any_id');
    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email');
    expect(user.telephone).toBe('any_telephone');
    expect(user.createdAt.toISOString()).toBe('2022-02-02T00:00:00.000Z');
    expect(user.role).toBe('ADMIN');
  });

  test('generatePasswordHash should generate a password hash', () => {
    const hash = User.generatePasswordHash('any_password');

    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: hash,
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(user.validatePassword('any_password')).toBe(true);
  });

  test('new instance without id and createdAt', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      {}
    );

    expect(user.toJSON()).toStrictEqual({
      id: expect.any(String),
      name: 'any_name',
      email: 'any_email',
      telephone: 'any_telephone',

      role: 'ADMIN',
      createdAt: expect.any(String),
      cpf: '47550151032',
      addresses: [],
      deletedAt: undefined,
    });
  });

  test('getters should return the correct values', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      {}
    );

    expect(user.id).toStrictEqual(expect.any(String));
    expect(user.name).toBe('any_name');
    expect(user.email).toBe('any_email');
    expect(user.telephone).toBe('any_telephone');
    expect(user.createdAt).toStrictEqual(expect.any(Date));
    expect(user.cpf).toBe('47550151032');
    expect(user.role).toBe('ADMIN');
    expect(user.addresses).toStrictEqual([]);
  });

  test('addAddress should add an address', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      {}
    );

    user.addAddress(
      new Address(
        {
          street: 'any_street',
          number: 1,
          district: 'any_district',
          city: 'any_city',
          state: 'any_state',
          country: 'any_country',
          zipCode: 'any_zipCode',
        },
        { createdAt: new Date('2023-06-11T14:19:52.960Z') }
      )
    );

    expect(user.addresses.map((a) => a.toJSON())).toStrictEqual([
      {
        street: 'any_street',
        number: 1,
        district: 'any_district',
        city: 'any_city',
        state: 'any_state',
        country: 'any_country',
        zipCode: 'any_zipCode',
        createdAt: '2023-06-11T14:19:52.960Z',
        deletedAt: undefined,
        id: 'any_id',
      },
    ]);
  });

  test('removeAddress should remove an address', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [
          new Address({
            street: 'any_street',
            number: 1,
            district: 'any_district',
            city: 'any_city',
            state: 'any_state',
            country: 'any_country',
            zipCode: 'any_zipCode',
          }),
        ],
      },
      {}
    );

    user.removeAddress('any_id');
    user.removeAddress('any_id');

    expect(user.addresses).toStrictEqual([]);
  });

  test('changeEmail should change the email', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      {}
    );

    user.changeEmail('new_email');

    expect(user.email).toBe('new_email');
  });

  test('changeTelephone should change the telephone', () => {
    const user = new User(
      {
        name: 'any_name',
        email: 'any_email',
        telephone: 'any_telephone',
        passwordHash: 'any_password',
        role: UserRoleEnum.ADMIN,
        cpf: '47550151032',
        addresses: [],
      },
      {}
    );

    user.changeTelephone('new_telephone');

    expect(user.telephone).toBe('new_telephone');
  });
});
