import { User } from '../entities/user';

export interface IRemoveDogFromTripDTO {
  tripId: string;
  dogId: string;
  requester: User;
}
