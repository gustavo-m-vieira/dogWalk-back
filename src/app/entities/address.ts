import { v4 as uuidV4 } from 'uuid';

interface IAddress<DateType> {
  id: string;
  street: string;
  number: number;
  complement?: string;
  city: string;
  district: string;
  state: string;
  country: string;
  zipCode: string;
  createdAt: DateType;
  deletedAt?: DateType;
}

interface IOptions {
  createdAt?: Date;
  id?: string;
  deletedAt?: Date;
}

export class Address {
  private props: IAddress<Date>;

  constructor(
    props: Omit<IAddress<Date>, 'id' | 'createdAt' | 'deletedAt'>,
    { id, createdAt, deletedAt }: IOptions = {}
  ) {
    this.props = {
      ...props,
      id: id || uuidV4(),
      createdAt: createdAt || new Date(),
      deletedAt,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get street(): string {
    return this.props.street;
  }

  get number(): number {
    return this.props.number;
  }

  get complement(): string | undefined {
    return this.props.complement;
  }

  get city(): string {
    return this.props.city;
  }

  get district(): string {
    return this.props.district;
  }

  get state(): string {
    return this.props.state;
  }

  get country(): string {
    return this.props.country;
  }

  get zipCode(): string {
    return this.props.zipCode;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  public delete(): void {
    this.props.deletedAt = new Date();
  }

  public toJSON(): IAddress<string> {
    return {
      ...this.props,
      createdAt: this.props.createdAt.toISOString(),
      deletedAt: this.props.deletedAt?.toISOString(),
    };
  }
}
