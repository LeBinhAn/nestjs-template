import { Test, TestingModule } from '@nestjs/testing';
import { UserControllerController } from './users.controller';

describe('UserControllerController', () => {
  let controller: UserControllerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllerController],
    }).compile();

    controller = module.get<UserControllerController>(UserControllerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
