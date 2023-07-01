import { User } from '../entities/user';

export interface IReturnDogFromTripDTO {
  tripId: string;
  dogId: string;
  requester: User;
}
