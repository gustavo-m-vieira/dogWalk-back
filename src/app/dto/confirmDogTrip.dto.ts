import { User } from '../entities/user';

export interface IConfirmDogTripDTO {
  tripId: string;
  dogId: string;
  requester: User;
}
