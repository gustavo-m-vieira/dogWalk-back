/* eslint-disable class-methods-use-this */
import { IDogRepository } from '../../../src/app/repositories/IDog.repository';
import { GetDogsUseCase } from '../../../src/app/useCases/getDogs.useCase';

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

describe('GetDogsUseCase', () => {
  let getDogsUseCase: GetDogsUseCase;

  beforeEach(() => {
    getDogsUseCase = new GetDogsUseCase(dogRepository);
  });

  it('should get all dogs', async () => {
    const dogs = await getDogsUseCase.execute({});

    expect(dogs).toStrictEqual([]);
  });

  it('should get dogs filtered by tutor-id', async () => {
    const dogs = await getDogsUseCase.execute({
      tutorId: 'tutor-id',
    });

    expect(dogs).toStrictEqual([]);
  });
});
