import { User } from '../entities/user';

export interface IGetTripDTO {
  tripId: string;
  requester: User;
}
