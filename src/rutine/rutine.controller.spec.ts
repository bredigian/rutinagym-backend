import { Test, TestingModule } from '@nestjs/testing';
import { RutineController } from './rutine.controller';

describe('RutineController', () => {
  let controller: RutineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RutineController],
    }).compile();

    controller = module.get<RutineController>(RutineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
