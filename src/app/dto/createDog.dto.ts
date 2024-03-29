import { User } from '../entities/user';
import type { DogSizeEnum, DogTemperamentEnum } from '../enums';

export interface ICreateDogDTO {
  name: string;
  breed: string;
  size: DogSizeEnum;
  birthDate: string;
  temperament: DogTemperamentEnum;
  tutorId: string;
  image?: string;
  requester: User;
}
