import { Dog } from '../entities/dog';
import { IDogRepository } from '../repositories/IDog.repository';

export class DeleteDogUseCase {
  constructor(private dogRepository: IDogRepository) {}

  async execute(id: string): Promise<Dog> {
    const dog = await this.dogRepository.findById(id);

    if (!dog) throw new Error('Dog not found');

    if (dog.remove()) await this.dogRepository.save(dog);

    return dog;
  }
}
