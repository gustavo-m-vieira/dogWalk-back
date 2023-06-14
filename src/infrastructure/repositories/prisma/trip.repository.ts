import { PrismaClient } from '@prisma/client';
import { IOptions, ITripRepository } from '../../../app/repositories/ITrip.repository';
import { Trip } from '../../../app/entities/trip';
import { DogTemperamentEnum as InnerDogTemperamentEnum } from '../../../app/enums';

export class PrismaTripRepository implements ITripRepository {
  constructor(private prisma: PrismaClient) {}

  async findById(id: string): Promise<Trip | undefined> {
    const trip = await this.prisma.trips.findUnique({
      where: {
        id,
      },
      include: {
        TripsDogs: {
          select: {
            DogId: true,
          },
        },
      },
    });

    if (!trip) return undefined;

    return new Trip(
      {
        walkerId: trip.DogWalkerId,
        dogType: trip.dogType as InnerDogTemperamentEnum,
        duration: trip.duration,
        slots: trip.slots,
        startDate: trip.startDate,
        dogs: trip.TripsDogs.map((tripDog) => tripDog.DogId),
        addressId: trip.addressesId,
      },
      {
        createdAt: trip.createdAt,
        deletedAt: trip.deletedAt || undefined,
        id: trip.id,
      }
    );
  }

  async findByWalkerId(walkerId: string, options?: IOptions): Promise<Trip[]> {
    const { startDate } = options || {};

    const trips = await this.prisma.trips.findMany({
      where: {
        DogWalkerId: walkerId,
        ...(startDate && { startDate }),
      },
      include: {
        TripsDogs: {
          select: {
            DogId: true,
          },
        },
      },
    });

    return trips.map(
      (trip) =>
        new Trip(
          {
            walkerId: trip.DogWalkerId,
            dogType: trip.dogType as InnerDogTemperamentEnum,
            duration: trip.duration,
            slots: trip.slots,
            startDate: trip.startDate,
            dogs: trip.TripsDogs.map((tripDog) => tripDog.DogId),
            addressId: trip.addressesId,
          },
          {
            createdAt: trip.createdAt,
            deletedAt: trip.deletedAt || undefined,
            id: trip.id,
          }
        )
    );
  }

  async findByDogId(dogId: string, options?: IOptions): Promise<Trip[]> {
    const { startDate } = options || {};

    const trips = await this.prisma.trips.findMany({
      where: {
        TripsDogs: {
          some: {
            DogId: dogId,
          },
        },
        ...(startDate && { startDate }),
      },
      include: {
        TripsDogs: {
          select: {
            DogId: true,
          },
        },
      },
    });

    return trips.map(
      (trip) =>
        new Trip(
          {
            walkerId: trip.DogWalkerId,
            dogType: trip.dogType as InnerDogTemperamentEnum,
            duration: trip.duration,
            slots: trip.slots,
            startDate: trip.startDate,
            dogs: trip.TripsDogs.map((tripDog) => tripDog.DogId),
            addressId: trip.addressesId,
          },
          {
            createdAt: trip.createdAt,
            deletedAt: trip.deletedAt || undefined,
            id: trip.id,
          }
        )
    );
  }

  async findByZipCode(zipCode: string, options?: IOptions): Promise<Trip[]> {
    const { startDate } = options || {};

    const trips = await this.prisma.trips.findMany({
      where: {
        address: {
          zipCode: {
            startsWith: zipCode.slice(0, 3),
          },
        },
        ...(startDate && { startDate }),
      },
      include: {
        TripsDogs: {
          select: {
            DogId: true,
          },
        },
      },
    });

    return trips.map(
      (trip) =>
        new Trip(
          {
            walkerId: trip.DogWalkerId,
            dogType: trip.dogType as InnerDogTemperamentEnum,
            duration: trip.duration,
            slots: trip.slots,
            startDate: trip.startDate,
            dogs: trip.TripsDogs.map((tripDog) => tripDog.DogId),
            addressId: trip.addressesId,
          },
          {
            createdAt: trip.createdAt,
            deletedAt: trip.deletedAt || undefined,
            id: trip.id,
          }
        )
    );
  }

  async save(trip: Trip): Promise<void> {
    const { added, removed } = trip.dogsDiff();

    await this.prisma.trips.upsert({
      where: {
        id: trip.id,
      },
      update: {
        DogWalkerId: trip.walkerId,
        dogType: trip.dogType,
        duration: trip.duration,
        slots: trip.slots,
        startDate: trip.startDate,
        createdAt: trip.createdAt,
        deletedAt: trip.deletedAt,
        addressesId: trip.addressId,
        TripsDogs: {
          deleteMany: removed.map((dogId) => ({
            DogId: dogId,
          })),
          createMany: {
            data: added.map((dogId) => ({
              DogId: dogId,
              createdAt: new Date(),
            })),
          },
        },
      },
      create: {
        id: trip.id,
        DogWalkerId: trip.walkerId,
        dogType: trip.dogType,
        duration: trip.duration,
        slots: trip.slots,
        startDate: trip.startDate,
        createdAt: trip.createdAt,
        deletedAt: trip.deletedAt,
        addressesId: trip.addressId,
        TripsDogs: {
          createMany: {
            data: trip.dogs.map((dogId) => ({
              DogId: dogId,
              createdAt: new Date(),
            })),
          },
        },
      },
    });
  }
}
