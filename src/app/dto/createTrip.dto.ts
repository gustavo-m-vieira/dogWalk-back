import { DogTemperamentEnum } from '../enums';

export interface ICreateTripDTO {
  addressId: string;
  dogType: DogTemperamentEnum;
  duration: number;
  slots: number;
  startDate: string;
  walkerId: string;
}
