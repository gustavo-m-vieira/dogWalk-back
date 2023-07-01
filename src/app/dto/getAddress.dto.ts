import { User } from '../entities/user';

export interface IGetAddressDTO {
  userId: string;
  addressId: string;
  requester: User;
}
