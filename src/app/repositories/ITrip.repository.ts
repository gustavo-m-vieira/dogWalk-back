import { Trip } from '../entities/trip';

export interface ITripRepository {
  save(trip: Trip): Promise<void>;
  findById(id: string): Promise<Trip | undefined>;
  findByUserId(userId: string): Promise<Trip[]>;
  findByDogId(dogId: string): Promise<Trip[]>;
}
