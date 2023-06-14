import { ICreateDogDTO } from '../dto/createDog.dto';
import { Dog } from '../entities/dog';
import type { IDogRepository } from '../repositories/IDog.repository';

export class CreateDogUseCase {
  constructor(private readonly dogsRepository: IDogRepository) {}

  async execute(data: ICreateDogDTO): Promise<Dog> {
    const { name, breed, size, birthDate, temperament, tutorId } = data;

    const dog = new Dog({
      name,
      breed,
      size,
      birthDate: new Date(birthDate),
      temperament,
      tutorId,
    });

    await this.dogsRepository.save(dog);

    return dog;
  }
}
