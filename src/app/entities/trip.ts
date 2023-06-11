import { DogTemperamentEnum } from '../enums';

interface ITrip<DateType> {
  id: string;
  startDate: DateType;
  duration: number;
  createdAt: DateType;
  deletedAt?: DateType;
  slots: number;
  dogType: DogTemperamentEnum;
  walkerId: string;
  dogs: string[];
}

interface IOptions {
  createdAt?: Date;
  id?: string;
  deletedAt?: Date;
}

export class Trip {
  private props: ITrip<Date>;

  private previousDogs: string[] = [];

  constructor(props: Omit<ITrip<Date>, 'id' | 'createdAt' | 'deletedAt'>, options: IOptions = {}) {
    this.props = {
      startDate: props.startDate,
      duration: props.duration,
      slots: props.slots,
      dogType: props.dogType,
      walkerId: props.walkerId,
      dogs: props.dogs,
      id: options.id || 'any_id',
      createdAt: options.createdAt || new Date(),
      deletedAt: options.deletedAt,
    };

    this.previousDogs = [...this.props.dogs];
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

  get walkerId(): string {
    return this.props.walkerId;
  }

  get dogs(): string[] {
    return this.props.dogs;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  delete(): Boolean {
    if (this.deletedAt) return false;

    this.props.deletedAt = new Date();
    return true;
  }

  addDog(dogId: string): Boolean {
    if (this.dogs.includes(dogId)) return false;

    this.dogs.push(dogId);
    return true;
  }

  removeDog(dogId: string): Boolean {
    if (!this.dogs.includes(dogId)) return false;

    this.dogs.splice(this.dogs.indexOf(dogId), 1);
    return true;
  }

  dogsDiff(): { added: string[]; removed: string[] } {
    const added = this.dogs.filter((dog) => !this.previousDogs.includes(dog));
    const removed = this.previousDogs.filter((dog) => !this.dogs.includes(dog));

    return {
      added,
      removed,
    };
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
      deletedAt: this.deletedAt?.toISOString(),
    };
  }
}
