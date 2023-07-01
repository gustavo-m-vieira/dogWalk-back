import { IDeleteDogDTO } from '../dto/deleteDog.dto';
import { Dog } from '../entities/dog';
import { IDogRepository } from '../repositories/IDog.repository';

export class DeleteDogUseCase {
  constructor(private dogRepository: IDogRepository) {}

  async execute(data: IDeleteDogDTO): Promise<Dog> {
    const { dogId, requester } = data;

    const dog = await this.dogRepository.findById(dogId);

    if (!dog) throw new Error('Dog not found');

    if (requester.role !== 'ADMIN' && requester.id !== dog.tutorId)
      throw new Error('You cannot delete another user dog');

    if (dog.remove()) await this.dogRepository.save(dog);

    return dog;
  }
}
