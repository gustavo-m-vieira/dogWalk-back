import { Trip } from '../../../src/app/entities/trip';
import { DogTemperamentEnum } from '../../../src/app/enums';

describe('Trip', () => {
  test('should create a trip with default values', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    expect(trip.id).toBeDefined();
    expect(trip.createdAt).toBeDefined();
  });

  test('should try to delete a trip that was already deleted', () => {
    const trip = new Trip(
      {
        startDate: new Date('2021-01-01T12:00:00'),
        duration: 60,
        slots: 1,
        dogType: DogTemperamentEnum.SHY,
        walkerId: '1',
        dogs: [{ id: '1' }],
        addressId: '1',
      },
      { deletedAt: new Date('2021-01-01T12:00:00') }
    );

    expect(trip.delete()).toBeFalsy();
  });

  test('should delete a trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    expect(trip.delete()).toBe(true);
  });

  test('add a dog that is already at the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    const added = trip.addDog('1');
    expect(added).toBe(false);
  });

  test('add a dog to the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    const added = trip.addDog('2');
    expect(added).toBe(true);
    expect(trip.dogs).toEqual([{ id: '1' }, { id: '2' }]);
  });

  test('trying to remove a dog that is not on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    const removed = trip.removeDog('2');
    expect(removed).toBe(false);
  });

  test('trying to remove a dog that is not on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    const removed = trip.removeDog('1');
    expect(removed).toBe(true);
    expect(trip.dogs).toEqual([]);
  });

  test('testing dogsDiff', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }, { id: '2' }],
      addressId: '1',
    });

    trip.addDog('3');
    trip.addDog('4');
    trip.removeDog('1');
    trip.dropDog('2');
    expect(trip.dogsDiff()).toStrictEqual({
      added: [{ id: '3' }, { id: '4' }],
      removed: [{ id: '1' }],
      updated: [{ id: '2', droppedAt: expect.any(Date) }],
    });
  });

  test('should create a trip with custom values', () => {
    const trip = new Trip(
      {
        startDate: new Date('2021-01-01T12:00:00'),
        duration: 60,
        slots: 1,
        dogType: DogTemperamentEnum.SHY,
        walkerId: '1',
        dogs: [{ id: '1' }],
        addressId: '1',
      },
      {
        id: 'custom_id',
        createdAt: new Date('2021-01-01T12:00:00'),
      }
    );

    expect(trip.id).toBe('custom_id');
    expect(trip.createdAt).toEqual(new Date('2021-01-01T12:00:00'));
  });

  test('getters should return the correct values', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    expect(trip.startDate).toEqual(new Date('2021-01-01T12:00:00'));
    expect(trip.duration).toBe(60);
    expect(trip.endDate).toEqual(new Date('2021-01-01T13:00:00'));
    expect(trip.slots).toBe(1);
    expect(trip.dogType).toBe(DogTemperamentEnum.SHY);
    expect(trip.walkerId).toBe('1');
    expect(trip.dogs).toEqual([{ id: '1' }]);
  });

  test('toJSON should return the correct values', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      addressId: '1',
    });

    expect(trip.toJSON()).toEqual({
      id: trip.id,
      startDate: trip.startDate.toISOString(),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }],
      createdAt: trip.createdAt.toISOString(),
      addressId: '1',
      deletedAt: undefined,
    });
  });

  test('Catch a dog that is not on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 2,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }, { id: '2' }],
      addressId: '1',
    });

    const caught = trip.catchDog('3');
    expect(caught).toBe(false);
  });

  test('Catch a dog that is on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 2,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }, { id: '2' }],
      addressId: '1',
    });

    const caught = trip.catchDog('2');
    expect(caught).toBe(true);
    expect(trip.dogs).toEqual([{ id: '1' }, { id: '2', caughtAt: expect.any(Date) }]);
  });

  test('Drop a dog that is not on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 2,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }, { id: '2' }],
      addressId: '1',
    });

    const dropped = trip.dropDog('3');
    expect(dropped).toBe(false);
  });

  test('Drop a dog that is on the trip', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 2,
      dogType: DogTemperamentEnum.SHY,
      walkerId: '1',
      dogs: [{ id: '1' }, { id: '2' }],
      addressId: '1',
    });

    const dropped = trip.dropDog('2');
    expect(dropped).toBe(true);
    expect(trip.dogs).toEqual([{ id: '1' }, { id: '2', droppedAt: expect.any(Date) }]);
  });
});
