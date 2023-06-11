import { Dog } from '../entities/dog';

export interface IDogRepository {
  save(dog: Dog): Promise<void>;
  findById(id: string): Promise<Dog | undefined>;
  findByUserId(userId: string): Promise<Dog[]>;
}
