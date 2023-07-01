import { User } from '../entities/user';

export interface IAddDogToTripDTO {
  tripId: string;
  dogId: string;
  requester: User;
}
