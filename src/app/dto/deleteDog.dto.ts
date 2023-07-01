import { User } from '../entities/user';

export interface IDeleteDogDTO {
  dogId: string;
  requester: User;
}
