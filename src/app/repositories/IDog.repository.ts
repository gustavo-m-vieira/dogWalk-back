import { Dog } from '../entities/dog';

export interface IDogRepository {
  save(dog: Dog): Promise<void>;
  findById(id: string): Promise<Dog | undefined>;
  findByTutorId(userId: string): Promise<Dog[]>;
  findAll(): Promise<Dog[]>;
  findByIds(ids: string[]): Promise<Dog[]>;
}
