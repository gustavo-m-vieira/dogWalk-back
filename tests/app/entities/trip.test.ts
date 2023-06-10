import { Trip } from '../../../src/app/entities/trip';
import { DogTemperamentEnum } from '../../../src/app/enums';

describe('Trip', () => {
  test('should create a trip with default values', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: 1,
      dogs: [1],
    });

    expect(trip.id).toBeDefined();
    expect(trip.createdAt).toBeDefined();
  });

  test('should create a trip with custom values', () => {
    const trip = new Trip(
      {
        startDate: new Date('2021-01-01T12:00:00'),
        duration: 60,
        slots: 1,
        dogType: DogTemperamentEnum.SHY,
        walkerId: 1,
        dogs: [1],
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
      walkerId: 1,
      dogs: [1],
    });

    expect(trip.startDate).toEqual(new Date('2021-01-01T12:00:00'));
    expect(trip.duration).toBe(60);
    expect(trip.endDate).toEqual(new Date('2021-01-01T13:00:00'));
    expect(trip.slots).toBe(1);
    expect(trip.dogType).toBe(DogTemperamentEnum.SHY);
    expect(trip.walkerId).toBe(1);
    expect(trip.dogs).toEqual([1]);
  });

  test('toJSON should return the correct values', () => {
    const trip = new Trip({
      startDate: new Date('2021-01-01T12:00:00'),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: 1,
      dogs: [1],
    });

    expect(trip.toJSON()).toEqual({
      id: trip.id,
      startDate: trip.startDate.toISOString(),
      duration: 60,
      slots: 1,
      dogType: DogTemperamentEnum.SHY,
      walkerId: 1,
      dogs: [1],
      createdAt: trip.createdAt.toISOString(),
    });
  });
});
