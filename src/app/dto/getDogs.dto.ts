import { User } from '../entities/user';

export interface IGetDogsDTO {
  tutorId?: string;
  requester: User;
}
