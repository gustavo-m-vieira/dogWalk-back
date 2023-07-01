import { User } from '../entities/user';

export interface IGetTripsDTO {
  zipCode?: string;
  walkerId?: string;
  date?: Date;
  requester: User;
}
