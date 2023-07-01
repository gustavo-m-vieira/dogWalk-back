/* eslint-disable class-methods-use-this */
import { DogSizeEnum, DogTemperamentEnum, UserRoleEnum } from '../../../src/app/enums';
import { IDogRepository } from '../../../src/app/repositories/IDog.repository';
import { CreateDogUseCase } from '../../../src/app/useCases/createDog.useCase';
import { User } from '../../../src/app/entities/user';

jest.mock('uuid', () => ({
  v4: () => '361eb36f-d02c-4d08-9b3a-57d40df559cc',
}));

jest.useFakeTimers().setSystemTime(new Date('2023-06-13T23:47:16.998Z'));

const requester = new User(
  {
    name: 'any_name',
    email: 'any_email',
    telephone: 'any_telephone',
    passwordHash: 'any_password',
    role: UserRoleEnum.ADMIN,
    cpf: '47550151032',
    addresses: [],
  },
  { id: 'userId' }
);

class MockDogRepository implements IDogRepository {
  private success = 2;

  async findById() {
    return undefined;
  }

  async findByIds() {
    return [];
  }

  async findByTutorId() {
    return [];
  }

  async save() {
    this.success -= 1;
    if (this.success === 0) throw new Error('Tutor not found');
    return undefined;
  }

  async findAll() {
    return [];
  }
}

const dogRepository = new MockDogRepository();

describe('CreateDogUseCase', () => {
  let createDogUseCase: CreateDogUseCase;

  beforeEach(() => {
    createDogUseCase = new CreateDogUseCase(dogRepository);
  });

  it('should create a dog', async () => {
    const dog = await createDogUseCase.execute({
      name: 'Rex',
      tutorId: 'tutor-id',
      size: DogSizeEnum.SMALL,
      temperament: DogTemperamentEnum.ANGRY,
      birthDate: '2020-01-01',
      breed: 'breed',
      requester,
    });

    expect(dog.toJSON()).toStrictEqual({
      birthDate: '2020-01-01T00:00:00.000Z',
      breed: 'breed',
      createdAt: '2023-06-13T23:47:16.998Z',
      deletedAt: undefined,
      id: '361eb36f-d02c-4d08-9b3a-57d40df559cc',
      size: 'SMALL',
      temperament: 'ANGRY',
      name: 'Rex',
      tutorId: 'tutor-id',
      image: undefined,
    });
  });

  it('should throw an error if the tutor does not exist', async () => {
    expect(() =>
      createDogUseCase.execute({
        name: 'Rex',
        tutorId: 'tutor-id',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
        requester,
      })
    ).rejects.toThrowError();
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      createDogUseCase.execute({
        name: 'Rex',
        tutorId: 'tutor-id',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
        requester: new User(
          {
            name: 'any_name',
            email: 'any_email',
            telephone: 'any_telephone',
            passwordHash: 'any_password',
            role: UserRoleEnum.WALKER,
            cpf: '47550151032',
            addresses: [],
          },
          { id: 'anotherUserId' }
        ),
      })
    ).rejects.toThrow('You cannot add a dog to another tutor');
  });
});
