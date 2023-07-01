import { User } from '../entities/user';

export interface IDeleteTripDTO {
  tripId: string;
  requester: User;
}
