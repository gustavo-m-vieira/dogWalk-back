import { ITripRepository } from '../../../app/repositories/ITrip.repository';
import { DogTemperamentEnum } from '../../../app/enums';
import { Trip } from '../../../app/entities/trip';

export class MockTripRepository implements ITripRepository {
  private trips: Trip[];

  constructor() {
    this.trips = [
      new Trip(
        {
          walkerId: '1',
          dogType: DogTemperamentEnum.SHY,
          duration: 30,
          slots: 2,
          startDate: new Date('2021-01-01T00:00:00.000Z'),
          dogs: [{ id: '1' }],
          addressId: '1',
        },
        { id: '1', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Trip(
        {
          walkerId: '1',
          dogType: DogTemperamentEnum.SHY,
          duration: 30,
          slots: 2,
          startDate: new Date('2021-01-01T00:00:00.000Z'),
          dogs: [{ id: '1' }],
          addressId: '1',
        },
        { id: '2', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Trip(
        {
          walkerId: '1',
          dogType: DogTemperamentEnum.SHY,
          duration: 30,
          slots: 2,
          startDate: new Date('2021-01-01T00:00:00.000Z'),
          dogs: [{ id: '1' }],
          addressId: '1',
        },
        { id: '3', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Trip(
        {
          walkerId: '1',
          dogType: DogTemperamentEnum.SHY,
          duration: 30,
          slots: 2,
          startDate: new Date('2021-01-01T00:00:00.000Z'),
          dogs: [{ id: '1' }],
          addressId: '1',
        },
        { id: '4', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
    ];
  }

  async findById(id: string): Promise<Trip | undefined> {
    const trip = this.trips.find((t) => t.id === id);

    if (!trip) return undefined;

    return trip;
  }

  async findByWalkerId(walkerId: string): Promise<Trip[]> {
    const trips = this.trips.filter((trip) => trip.walkerId === walkerId);

    return trips;
  }

  async findByZipCode(): Promise<Trip[]> {
    return this.trips;
  }

  async save(trip: Trip): Promise<void> {
    const tripIndex = this.trips.findIndex((t) => t.id === trip.id);

    if (tripIndex >= 0) {
      this.trips[tripIndex] = trip;
    } else {
      this.trips.push(trip);
    }
  }

  async findByDogId(dogId: string): Promise<Trip[]> {
    const trips = this.trips.filter((trip) => trip.dogs.some((dog) => dog.id === dogId));

    return trips;
  }
}
