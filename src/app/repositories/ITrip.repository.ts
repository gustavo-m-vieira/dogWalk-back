import { Trip } from '../entities/trip';

export interface IOptions {
  startDate?: Date;
}

export interface ITripRepository {
  save(trip: Trip): Promise<void>;
  findById(id: string): Promise<Trip | undefined>;
  findByWalkerId(userId: string, options?: IOptions): Promise<Trip[]>;
  findByDogId(dogId: string, options?: IOptions): Promise<Trip[]>;
  findByZipCode(zipCode: string, options?: IOptions): Promise<Trip[]>;
  findAll(options?: IOptions): Promise<Trip[]>;
}
