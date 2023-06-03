import { GetDogsController } from '../../../src/app/controllers/getDogs.controller';

describe('GetDogsController', () => {
  let getDogsController: GetDogsController;

  beforeEach(() => {
    getDogsController = new GetDogsController();
  });

  describe('getDogs', () => {
    it('should return a list of dogs', async () => {
      const response = await getDogsController.handle();

      expect(response).toStrictEqual({
        body: {
          message: 'Dogs fetched successfully',
        },
        statusCode: 200,
      });
    });
  });
});
