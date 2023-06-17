import { Dog } from '../../../app/entities/dog';
import { DogSizeEnum, DogTemperamentEnum } from '../../../app/enums';
import { IDogRepository } from '../../../app/repositories/IDog.repository';

export class MockDogRepository implements IDogRepository {
  private dogs: Dog[];

  constructor() {
    this.dogs = [
      new Dog(
        {
          name: 'Buddy',
          temperament: DogTemperamentEnum.SHY,
          breed: 'Labrador',
          birthDate: new Date('2021-01-01T00:00:00.000Z'),
          size: DogSizeEnum.MEDIUM,
          tutorId: '1',
        },
        { id: '1', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Dog(
        {
          name: 'Buddy',
          temperament: DogTemperamentEnum.SHY,
          breed: 'Labrador',
          birthDate: new Date('2021-01-01T00:00:00.000Z'),
          size: DogSizeEnum.MEDIUM,
          tutorId: '1',
        },
        { id: '2', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Dog(
        {
          name: 'Buddy',
          temperament: DogTemperamentEnum.SHY,
          breed: 'Labrador',
          birthDate: new Date('2021-01-01T00:00:00.000Z'),
          size: DogSizeEnum.MEDIUM,
          tutorId: '1',
        },
        { id: '3', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
      new Dog(
        {
          name: 'Buddy',
          temperament: DogTemperamentEnum.SHY,
          breed: 'Labrador',
          birthDate: new Date('2021-01-01T00:00:00.000Z'),
          size: DogSizeEnum.MEDIUM,
          tutorId: '1',
        },
        { id: '4', createdAt: new Date('2021-01-01T00:00:00.000Z') }
      ),
    ];
  }

  async findAll(): Promise<Dog[]> {
    return this.dogs;
  }

  async findById(id: string): Promise<Dog | undefined> {
    const dog = this.dogs.find((d) => d.id === id);

    if (!dog) return undefined;

    return dog;
  }

  async findByIds(ids: string[]): Promise<Dog[]> {
    const dogs = this.dogs.filter((d) => ids.includes(d.id));

    return dogs;
  }

  async findByTutorId(tutorId: string): Promise<Dog[]> {
    const dogs = this.dogs.filter((d) => d.tutorId === tutorId);

    return dogs;
  }

  async save(dog: Dog): Promise<void> {
    const dogIndex = this.dogs.findIndex((d) => d.id === dog.id);

    if (dogIndex >= 0) {
      this.dogs[dogIndex] = dog;
    } else {
      this.dogs.push(dog);
    }
  }
}
