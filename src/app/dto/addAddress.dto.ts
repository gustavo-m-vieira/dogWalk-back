import { User } from '../entities/user';

export interface IAddAddressDTO {
  street: string;
  number: number;
  complement?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
  userId: string;
  requester: User;
}
