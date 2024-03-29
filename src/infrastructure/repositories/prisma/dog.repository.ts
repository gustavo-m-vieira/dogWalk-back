import { PrismaClient } from '@prisma/client';
import { IDogRepository } from '../../../app/repositories/IDog.repository';
import { Dog } from '../../../app/entities/dog';
import {
  DogTemperamentEnum as InnerDogTemperamentEnum,
  DogSizeEnum as InnerDogSizeEnum,
} from '../../../app/enums';

export class PrismaDogRepository implements IDogRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Dog | undefined> {
    const dog = await this.prisma.dogs.findUnique({
      where: {
        id,
      },
    });

    if (!dog) return undefined;

    return new Dog(
      {
        ...dog,
        tutorId: dog.TutorId,
        size: dog.size as InnerDogSizeEnum,
        temperament: dog.temperament as InnerDogTemperamentEnum,
        image: dog.image || undefined,
      },
      {
        createdAt: dog.createdAt,
        deletedAt: dog.deletedAt || undefined,
        id: dog.id,
      }
    );
  }

  async findByIds(ids: Array<string>): Promise<Dog[]> {
    const dogs = await this.prisma.dogs.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });

    return dogs.map(
      (dog) =>
        new Dog(
          {
            ...dog,
            tutorId: dog.TutorId,
            size: dog.size as InnerDogSizeEnum,
            temperament: dog.temperament as InnerDogTemperamentEnum,
            image: dog.image || undefined,
          },
          {
            createdAt: dog.createdAt,
            deletedAt: dog.deletedAt || undefined,
            id: dog.id,
          }
        )
    );
  }

  async findByTutorId(tutorId: string): Promise<Dog[]> {
    const dogs = await this.prisma.dogs.findMany({
      where: {
        TutorId: tutorId,
      },
    });

    return dogs.map(
      (dog) =>
        new Dog(
          {
            ...dog,
            tutorId: dog.TutorId,
            size: dog.size as InnerDogSizeEnum,
            temperament: dog.temperament as InnerDogTemperamentEnum,
            image: dog.image || undefined,
          },
          {
            createdAt: dog.createdAt,
            deletedAt: dog.deletedAt || undefined,
            id: dog.id,
          }
        )
    );
  }

  async findAll(): Promise<Dog[]> {
    const dogs = await this.prisma.dogs.findMany();

    return dogs.map(
      (dog) =>
        new Dog(
          {
            ...dog,
            tutorId: dog.TutorId,
            size: dog.size as InnerDogSizeEnum,
            temperament: dog.temperament as InnerDogTemperamentEnum,
            image: dog.image || undefined,
          },
          {
            createdAt: dog.createdAt,
            deletedAt: dog.deletedAt || undefined,
            id: dog.id,
          }
        )
    );
  }

  async save(dog: Dog): Promise<void> {
    const { tutorId, id, birthDate, breed, createdAt, name, size, temperament, deletedAt, image } =
      dog.toJSON();

    try {
      await this.prisma.dogs.upsert({
        where: {
          id: dog.id,
        },
        create: {
          id,
          birthDate,
          breed,
          createdAt,
          name,
          size,
          temperament,
          TutorId: tutorId,
          image,
        },
        update: {
          birthDate,
          breed,
          createdAt,
          name,
          size,
          temperament,
          deletedAt,
          image,
          TutorId: tutorId,
        },
      });
    } catch (error) {
      console.error(error);

      if ((error as Error).message.includes('Dogs_TutorId_fkey')) {
        throw new Error('Tutor not found');
      }

      throw new Error('Unexpected error');
    }
  }
}
