/* eslint-disable class-methods-use-this */
import { Dog } from '../../../src/app/entities/dog';
import { IDogRepository } from '../../../src/app/repositories/IDog.repository';
import { GetDogsUseCase } from '../../../src/app/useCases/getDogs.useCase';
import { UserRoleEnum } from '../../../src/app/enums';
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

  async findByIds(): Promise<Dog[]> {
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
    const dogs = await getDogsUseCase.execute({ requester });

    expect(dogs).toStrictEqual([]);
  });

  it('should get dogs filtered by tutor-id', async () => {
    const dogs = await getDogsUseCase.execute({
      tutorId: 'tutor-id',
      requester,
    });

    expect(dogs).toStrictEqual([]);
  });

  it('should throw an error if user is not the same requester', async () => {
    expect(() =>
      getDogsUseCase.execute({
        tutorId: 'tutor-id',
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
    ).rejects.toThrow('You cannot get another user dogs');
  });

  it('should get dogs without filters', async () => {
    const dogs = await getDogsUseCase.execute({
      requester: new User(
        {
          name: 'any_name',
          email: 'any_email',
          telephone: 'any_telephone',
          passwordHash: 'any_password',
          role: UserRoleEnum.TUTOR,
          cpf: '47550151032',
          addresses: [],
        },
        { id: 'anotherUserId' }
      ),
    });

    expect(dogs).toStrictEqual([]);
  });
});
