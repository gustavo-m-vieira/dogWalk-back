import { Dog } from '../entities/dog';
import type { IDogRepository } from '../repositories/IDog.repository';

export class GetDogsUseCase {
  constructor(private readonly dogsRepository: IDogRepository) {}

  async execute(): Promise<Dog[]> {
    const dogs = await this.dogsRepository.findAll();
    return dogs;
  }
}
