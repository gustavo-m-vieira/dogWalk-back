import { ICreateDogDTO } from '../dto/createDog.dto';
import { Dog } from '../entities/dog';
import { UserRoleEnum } from '../enums';
import type { IDogRepository } from '../repositories/IDog.repository';

export class CreateDogUseCase {
  constructor(private readonly dogsRepository: IDogRepository) {}

  async execute(data: ICreateDogDTO): Promise<Dog> {
    const { name, breed, size, birthDate, temperament, tutorId, image, requester } = data;

    if (requester.role !== UserRoleEnum.ADMIN && requester.id !== tutorId)
      throw new Error('You cannot add a dog to another tutor');

    const dog = new Dog({
      name,
      breed,
      size,
      birthDate: new Date(birthDate),
      temperament,
      tutorId,
      image,
    });

    await this.dogsRepository.save(dog);

    return dog;
  }
}
