import { Dog } from '../entities/dog';
import type { IDogRepository } from '../repositories/IDog.repository';
import type { IGetDogsDTO } from '../dto/getDogs.dto';

export class GetDogsUseCase {
  constructor(private readonly dogsRepository: IDogRepository) {}

  async execute(data: IGetDogsDTO): Promise<Dog[]> {
    if (data.requester.role === 'ADMIN') {
      if (data.tutorId) this.dogsRepository.findByTutorId(data.tutorId);
      return this.dogsRepository.findAll();
    }

    if (data.tutorId && data.requester.id !== data.tutorId)
      throw new Error('You cannot get another user dogs');

    return this.dogsRepository.findByTutorId(data.requester.id);
  }
}
