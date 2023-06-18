import { v4 as uuidV4 } from 'uuid';
import { DogTemperamentEnum } from '../enums';

interface IDog {
  id: string;
  caughtAt?: Date;
  droppedAt?: Date;
}

interface ITrip<DateType> {
  id: string;
  startDate: DateType;
  duration: number;
  createdAt: DateType;
  deletedAt?: DateType;
  slots: number;
  dogType: DogTemperamentEnum;
  walkerId: string;
  dogs: IDog[];
  addressId: string;
}

interface IOptions {
  createdAt?: Date;
  id?: string;
  deletedAt?: Date;
}

export class Trip {
  private props: ITrip<Date>;

  private previousDogs: IDog[] = [];

  constructor(props: Omit<ITrip<Date>, 'id' | 'createdAt' | 'deletedAt'>, options: IOptions = {}) {
    this.props = {
      startDate: props.startDate,
      duration: props.duration,
      slots: props.slots,
      dogType: props.dogType,
      walkerId: props.walkerId,
      dogs: props.dogs,
      id: options.id || uuidV4(),
      addressId: props.addressId,
      createdAt: options.createdAt || new Date(),
      deletedAt: options.deletedAt,
    };

    this.previousDogs = this.props.dogs.map((dog) => ({ ...dog }));
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

  get dogs(): IDog[] {
    return this.props.dogs;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get deletedAt(): Date | undefined {
    return this.props.deletedAt;
  }

  get addressId(): string {
    return this.props.addressId;
  }

  delete(): Boolean {
    if (this.deletedAt) return false;

    this.props.deletedAt = new Date();
    return true;
  }

  addDog(dogId: string): Boolean {
    if (this.dogs.find(({ id }) => id === dogId)) return false;

    this.dogs.push({ id: dogId });
    return true;
  }

  removeDog(dogId: string): Boolean {
    if (!this.dogs.find(({ id }) => id === dogId)) return false;

    this.props.dogs = this.dogs.filter(({ id }) => id !== dogId);

    return true;
  }

  dogsDiff(): { added: IDog[]; removed: IDog[]; updated: IDog[] } {
    const added = this.dogs.filter(({ id }) => !this.previousDogs.find((dog) => dog.id === id));

    const removed = this.previousDogs.filter(({ id }) => !this.dogs.find((dog) => dog.id === id));

    const updated = this.dogs.filter(({ id, caughtAt, droppedAt }) =>
      this.previousDogs.find(
        (dog) => dog.id === id && (dog.caughtAt !== caughtAt || dog.droppedAt !== droppedAt)
      )
    );

    return {
      added,
      removed,
      updated,
    };
  }

  catchDog(dogId: string): Boolean {
    const dog = this.dogs.find(({ id }) => id === dogId);

    if (!dog || dog.caughtAt) return false;

    dog.caughtAt = new Date();

    return true;
  }

  dropDog(dogId: string): Boolean {
    const dog = this.dogs.find(({ id }) => id === dogId);

    if (!dog || dog.droppedAt) return false;

    dog.droppedAt = new Date();

    return true;
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
      addressId: this.addressId,
      createdAt: this.createdAt.toISOString(),
      deletedAt: this.deletedAt?.toISOString(),
    };
  }
}
