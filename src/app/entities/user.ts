import md5 from 'md5';
import { v4 as uuidV4 } from 'uuid';
import { UserRoleEnum } from '../enums';
import { Address } from './address';

interface IUser<DateType> {
  id: string;
  cpf: string;
  name: string;
  role: UserRoleEnum;
  email: string;
  telephone: string;
  passwordHash: string;
  createdAt: DateType;
  deletedAt?: DateType;
  addresses: Array<Address>;
}

interface IOptions {
  createdAt?: Date;
  id?: string;
  deletedAt?: Date;
}

export class User {
  private props: IUser<Date>;

  constructor(
    props: Omit<IUser<Date>, 'id' | 'createdAt' | 'deletedAt'>,
    { createdAt, id, deletedAt }: IOptions = {}
  ) {
    // TODO: add validation
    this.props = {
      name: props.name,
      email: props.email,
      telephone: props.telephone,
      passwordHash: props.passwordHash,
      id: id || uuidV4(),
      role: props.role,
      createdAt: createdAt || new Date(),
      deletedAt,
      cpf: props.cpf,
      addresses: props.addresses,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get email(): string {
    return this.props.email;
  }

  get telephone(): string {
    return this.props.telephone;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get role(): UserRoleEnum {
    return this.props.role;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  get addresses(): Array<Address> {
    return this.props.addresses;
  }

  get passwordHash(): string {
    return this.props.passwordHash;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  addAddress(address: Address): void {
    this.props.addresses.push(address);
  }

  removeAddress(id: string): boolean {
    const index = this.props.addresses.findIndex((a) => a.id === id);

    if (index !== -1) {
      this.props.addresses.splice(index, 1);
      return true;
    }

    return false;
  }

  changeEmail(email: string): void {
    // TODO: add email validation
    this.props.email = email;
  }

  changeTelephone(telephone: string): void {
    // TODO: add telephone validation
    this.props.telephone = telephone;
  }

  validatePassword(password: string): boolean {
    return md5(password) === this.props.passwordHash;
  }

  toJSON(): Omit<IUser<string>, 'passwordHash'> {
    // eslint-disable-next-line no-unused-vars
    const { passwordHash, ...props } = this.props;

    return {
      ...props,
      createdAt: this.props.createdAt.toISOString(),
      deletedAt: this.props.deletedAt?.toISOString(),
    };
  }

  static generatePasswordHash(password: string): string {
    return md5(password);
  }
}
