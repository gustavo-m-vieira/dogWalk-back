import { DogTemperamentEnum } from '../enums';

interface ITrip<DateType> {
  id: string;
  startDate: DateType;
  duration: number;
  createdAt: DateType;
  slots: number;
  dogType: DogTemperamentEnum;
  walkerId: number;
  dogs: number[];
}

interface IOptions {
  createdAt?: Date;
  id?: string;
}

export class Trip {
  private props: ITrip<Date>;

  constructor(props: Omit<ITrip<Date>, 'id' | 'createdAt'>, options: IOptions = {}) {
    this.props = {
      startDate: props.startDate,
      duration: props.duration,
      slots: props.slots,
      dogType: props.dogType,
      walkerId: props.walkerId,
      dogs: props.dogs,
      id: options.id || 'any_id',
      createdAt: options.createdAt || new Date(),
    };
  }

  get id(): string {
    return this.props.id;
  }

  get startDate(): Date {
    return this.props.startDate;
  }

  get duration(): number {
    return this.props.duration;
  }

  get endDate(): Date {
    return new Date(this.startDate.getTime() + this.duration * 60000);
  }

  get slots(): number {
    return this.props.slots;
  }

  get dogType(): DogTemperamentEnum {
    return this.props.dogType;
  }

  get walkerId(): number {
    return this.props.walkerId;
  }

  get dogs(): number[] {
    return this.props.dogs;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  toJSON(): ITrip<string> {
    return {
      id: this.id,
      startDate: this.startDate.toISOString(),
      duration: this.duration,
      slots: this.slots,
      dogType: this.dogType,
      walkerId: this.walkerId,
      dogs: this.dogs,
      createdAt: this.createdAt.toISOString(),
    };
  }
}
