import { v4 as uuidV4 } from 'uuid';
import type { DogSizeEnum, DogTemperamentEnum } from '../enums';

interface IDog<DateType> {
  id: string;
  name: string;
  breed: string;
  size: DogSizeEnum;
  birthDate: DateType;
  temperament: DogTemperamentEnum;
  createdAt: DateType;
  deletedAt?: DateType;
  tutorId: string;
  image?: string;
}

export interface IOptions {
  id?: string;
  createdAt?: Date;
  deletedAt?: Date;
}

export class Dog {
  private props: IDog<Date>;

  constructor(props: Omit<IDog<Date>, 'id' | 'createdAt' | 'deletedAt'>, options: IOptions = {}) {
    this.props = {
      id: options.id || uuidV4(),
      createdAt: options.createdAt || new Date(),
      deletedAt: options.deletedAt,
      name: props.name,
      breed: props.breed,
      size: props.size,
      birthDate: props.birthDate,
      temperament: props.temperament,
      tutorId: props.tutorId,
      image: props.image,
    };
  }

  get id(): string {
    return this.props.id;
  }

  get name(): string {
    return this.props.name;
  }

  get breed(): string {
    return this.props.breed;
  }

  get size(): DogSizeEnum {
    return this.props.size;
  }

  get birthDate(): Date {
    return this.props.birthDate;
  }

  get temperament(): DogTemperamentEnum {
    return this.props.temperament;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get tutorId(): string {
    return this.props.tutorId;
  }

  get image(): string | undefined {
    return this.props.image;
  }

  public remove(): boolean {
    if (this.props.deletedAt) return false;

    this.props.deletedAt = new Date();
    return true;
  }

  public toJSON(): IDog<string> {
    return {
      ...this.props,
      birthDate: this.props.birthDate.toISOString(),
      createdAt: this.props.createdAt.toISOString(),
      deletedAt: this.props.deletedAt?.toISOString(),
    };
  }
}
