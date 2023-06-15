/* eslint-disable class-methods-use-this */
import { DogSizeEnum, DogTemperamentEnum } from '../../../src/app/enums';
import { IDogRepository } from '../../../src/app/repositories/IDog.repository';
import { CreateDogUseCase } from '../../../src/app/useCases/createDog.useCase';

jest.mock('uuid', () => ({
  v4: () => '361eb36f-d02c-4d08-9b3a-57d40df559cc',
}));

jest.useFakeTimers().setSystemTime(new Date('2023-06-13T23:47:16.998Z'));

class MockDogRepository implements IDogRepository {
  private success = 2;

  async findById() {
    return undefined;
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
      })
    ).rejects.toThrowError();
  });
});
