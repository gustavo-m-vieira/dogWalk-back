import md5 from 'md5';
import { v4 as uuidV4 } from 'uuid';

export enum RolesEnum {
  ADMIN = 'ADMIN',
  WALKER = 'WALKER',
  TUTOR = 'TUTOR',
}

interface IUser {
  id: string;
  name: string;
  email: string;
  telephone: string;
  passwordHash: string;
  role: RolesEnum;
  createdAt: string;
}

interface IOptions {
  createdAt?: string;
  id?: string;
}

export class User {
  private props: IUser;

  constructor(props: Omit<IUser, 'id' | 'createdAt'>, { createdAt, id }: IOptions = {}) {
    this.props = {
      name: props.name,
      email: props.email,
      telephone: props.telephone,
      passwordHash: props.passwordHash,
      id: id || uuidV4(),
      role: props.role,
      createdAt: createdAt || new Date().toISOString(),
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

  get createdAt(): string {
    return this.props.createdAt;
  }

  get role(): RolesEnum {
    return this.props.role;
  }

  validatePassword(password: string): boolean {
    return md5(password) === this.props.passwordHash;
  }

  toJSON(): Omit<IUser, 'passwordHash'> {
    // eslint-disable-next-line no-unused-vars
    const { passwordHash, ...props } = this.props;

    return props;
  }

  static generatePasswordHash(password: string): string {
    return md5(password);
  }
}
