import { Dog } from '../entities/dog';
import type { IDogRepository } from '../repositories/IDog.repository';
import type { IGetDogsDTO } from '../dto/getDogs.dto';

export class GetDogsUseCase {
  constructor(private readonly dogsRepository: IDogRepository) {}

  async execute(data: IGetDogsDTO): Promise<Dog[]> {
    if (data.tutorId) return this.dogsRepository.findByTutorId(data.tutorId);

    return this.dogsRepository.findAll();
  }
}
