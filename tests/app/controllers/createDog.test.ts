/* eslint-disable class-methods-use-this */
import { CreateDogUseCase } from '../../../src/app/useCases/createDog.useCase';
import { CreateDogController } from '../../../src/app/controllers/createDog.controller';
import { IDogRepository } from '../../../src/app/repositories/IDog.repository';
import { DogSizeEnum, DogTemperamentEnum } from '../../../src/app/enums';
import { Dog } from '../../../src/app/entities/dog';

class MockDogRepository implements IDogRepository {
  async findById() {
    return undefined;
  }

  async findByTutorId() {
    return [];
  }

  async save() {
    return undefined;
  }
}

jest.mock('../../../src/app/useCases/createDog.useCase');

const createDogUseCase = new CreateDogUseCase(new MockDogRepository());

const executeSpy = jest.spyOn(createDogUseCase, 'execute');

describe('CreateDogController', () => {
  let createDogController: CreateDogController;

  beforeEach(() => {
    createDogController = new CreateDogController(createDogUseCase);
  });

  it('should create a dog', async () => {
    executeSpy.mockResolvedValueOnce(
      new Dog(
        {
          name: 'any_name',
          breed: 'any_breed',
          size: DogSizeEnum.MEDIUM,
          birthDate: new Date('2022-02-02'),
          temperament: DogTemperamentEnum.ANGRY,
          tutorId: 'any_id',
        },
        { createdAt: new Date('2022-02-02'), id: 'any_id' }
      )
    );
    await createDogController.handle({
      body: {
        name: 'Rex',
        tutorId: 'tutor-id',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
      },
      headers: {},
    });

    expect(executeSpy).toHaveBeenCalledWith({
      name: 'Rex',
      tutorId: 'tutor-id',
      size: 'SMALL',
      temperament: 'ANGRY',
      birthDate: '2020-01-01',
      breed: 'breed',
    });
  });

  it('should return 400 if missing fields', async () => {
    const response = await createDogController.handle({
      body: {
        name: 'name',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
      },
      headers: {},
    } as any);

    expect(response.statusCode).toBe(400);
    expect(response.body).toStrictEqual({
      message: 'Missing required fields',
    });
  });

  it('should return 500 if use case throws', async () => {
    executeSpy.mockRejectedValueOnce(new Error('Test'));

    const response = await createDogController.handle({
      body: {
        name: 'Rex',
        tutorId: 'tutor-id',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
      },
      headers: {},
    });

    expect(response.statusCode).toBe(500);
    expect(response.body).toStrictEqual({
      message: 'Internal server error',
    });
  });

  it('should return 404 if tutor not found', async () => {
    executeSpy.mockRejectedValueOnce(new Error('Tutor not found'));

    const response = await createDogController.handle({
      body: {
        name: 'Rex',
        tutorId: 'tutor-id',
        size: DogSizeEnum.SMALL,
        temperament: DogTemperamentEnum.ANGRY,
        birthDate: '2020-01-01',
        breed: 'breed',
      },
      headers: {},
    });

    expect(response.statusCode).toBe(404);
    expect(response.body).toStrictEqual({
      message: 'Tutor not found',
    });
  });
});
