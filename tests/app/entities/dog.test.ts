import { Dog } from '../../../src/app/entities/dog';
import { DogSizeEnum, DogTemperamentEnum } from '../../../src/app/enums';

jest.mock('uuid', () => ({
  v4: () => 'any_id',
}));

describe('Dog Entity', () => {
  test('should create a dog', () => {
    const dog = new Dog(
      {
        name: 'any_name',
        breed: 'any_breed',
        size: DogSizeEnum.MEDIUM,
        birthDate: new Date('2022-02-02'),
        temperament: DogTemperamentEnum.ANGRY,
        tutorId: 'any_id',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(dog.toJSON()).toStrictEqual({
      id: 'any_id',
      name: 'any_name',
      breed: 'any_breed',
      size: 'MEDIUM',
      birthDate: '2022-02-02T00:00:00.000Z',
      temperament: 'ANGRY',
      createdAt: '2022-02-02T00:00:00.000Z',
      tutorId: 'any_id',
      deletedAt: undefined,
    });
  });

  test('should create a dog using default options', () => {
    const dog = new Dog({
      name: 'any_name',
      breed: 'any_breed',
      size: DogSizeEnum.MEDIUM,
      birthDate: new Date('2022-02-02'),
      temperament: DogTemperamentEnum.ANGRY,
      tutorId: 'any_id',
    });

    expect(dog.toJSON()).toStrictEqual({
      id: 'any_id',
      name: 'any_name',
      breed: 'any_breed',
      size: 'MEDIUM',
      birthDate: '2022-02-02T00:00:00.000Z',
      temperament: 'ANGRY',
      createdAt: expect.any(String),
      tutorId: 'any_id',
      deletedAt: undefined,
    });
  });

  test('getters should return the correct values', () => {
    const dog = new Dog(
      {
        name: 'any_name',
        breed: 'any_breed',
        size: DogSizeEnum.MEDIUM,
        birthDate: new Date('2022-02-02'),
        temperament: DogTemperamentEnum.ANGRY,
        tutorId: 'any_id',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    expect(dog.id).toBe('any_id');
    expect(dog.name).toBe('any_name');
    expect(dog.breed).toBe('any_breed');
    expect(dog.size).toBe('MEDIUM');
    expect(dog.birthDate.toISOString()).toBe('2022-02-02T00:00:00.000Z');
    expect(dog.temperament).toBe('ANGRY');
    expect(dog.createdAt.toISOString()).toBe('2022-02-02T00:00:00.000Z');
    expect(dog.deletedAt).toBeUndefined();
    expect(dog.tutorId).toBe('any_id');
    expect(dog.image).toBeUndefined();
  });

  test('softDelete should set the deletedAt property', () => {
    const dog = new Dog(
      {
        name: 'any_name',
        breed: 'any_breed',
        size: DogSizeEnum.MEDIUM,
        birthDate: new Date('2022-02-02'),
        temperament: DogTemperamentEnum.ANGRY,
        tutorId: 'any_id',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id' }
    );

    dog.remove();

    expect(dog.deletedAt).toBeDefined();
  });

  test('softDelete should do nothing because its already deleted', () => {
    const dog = new Dog(
      {
        name: 'any_name',
        breed: 'any_breed',
        size: DogSizeEnum.MEDIUM,
        birthDate: new Date('2022-02-02'),
        temperament: DogTemperamentEnum.ANGRY,
        tutorId: 'any_id',
      },
      { createdAt: new Date('2022-02-02'), id: 'any_id', deletedAt: new Date() }
    );

    expect(dog.remove()).toBeFalsy();

    expect(dog.deletedAt).toBeDefined();
  });
});
