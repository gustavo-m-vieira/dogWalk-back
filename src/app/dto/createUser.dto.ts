import { UserRoleEnum } from '../enums';

export interface ICreateUserDTO {
  cpf: string;
  name: string;
  role: UserRoleEnum;
  email: string;
  telephone: string;
  password: string;
}
