/* eslint-disable class-methods-use-this */
import { Addresses, PrismaClient, UserRoleEnum } from '@prisma/client';
import { User } from '../../../app/entities/user';
import { Address } from '../../../app/entities/address';
import { IUserRepository } from '../../../app/repositories/IUser.repository';
import { UserRoleEnum as InnerUserRoleEnum } from '../../../app/enums';

export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | undefined> {
    const user = await this.prisma.users.findUnique({
      where: {
        id,
      },
      include: {
        Address: true,
      },
    });

    if (!user) return undefined;

    return new User(
      {
        ...user,
        addresses: this.parseAddresses(user.Address),
        role: user.role as InnerUserRoleEnum,
      },
      {
        id: user.id,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt || undefined,
      }
    );
  }

  private parseAddresses(rawAddresses: Addresses[]): Address[] {
    return rawAddresses.map(
      (address) =>
        new Address(
          { ...address, complement: address.complement || undefined },
          {
            id: address.id,
            createdAt: address.createdAt,
            deletedAt: address.deletedAt || undefined,
          }
        )
    );
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.prisma.users.findUnique({
      where: {
        email,
      },
      include: {
        Address: true,
      },
    });

    if (!user) return undefined;

    return new User(
      {
        ...user,
        addresses: this.parseAddresses(user.Address),
        role: user.role as InnerUserRoleEnum,
      },
      {
        id: user.id,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt || undefined,
      }
    );
  }

  async save(user: User): Promise<void> {
    const op = user.addresses.map((address) => ({
      where: {
        id: address.id,
      },
      update: {
        city: address.city,
        complement: address.complement,
        country: address.country,
        createdAt: address.createdAt,
        deletedAt: address.deletedAt,
        district: address.district,
        number: address.number,
        state: address.state,
        street: address.street,
        zipCode: address.zipCode,
      },
      create: {
        id: address.id,
        city: address.city,
        complement: address.complement,
        country: address.country,
        createdAt: address.createdAt,
        deletedAt: address.deletedAt,
        district: address.district,
        number: address.number,
        state: address.state,
        street: address.street,
        zipCode: address.zipCode,
      },
    }));

    await this.prisma.users.upsert({
      where: {
        id: user.id,
      },
      update: {
        name: user.name,
        email: user.email,
        telephone: user.telephone,
        passwordHash: user.passwordHash,
        role: user.role as UserRoleEnum,
        cpf: user.cpf,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt,
        Address: {
          upsert: op,
        },
      },
      create: {
        id: user.id,
        name: user.name,
        email: user.email,
        telephone: user.telephone,
        passwordHash: user.passwordHash,
        role: user.role as UserRoleEnum,
        cpf: user.cpf,
        createdAt: user.createdAt,
        deletedAt: user.deletedAt,
        Address: {
          create: op.map((o) => o.create),
        },
      },
    });
  }
}
