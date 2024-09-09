import { Test, TestingModule } from '@nestjs/testing';
import { RutineService } from './rutine.service';

describe('RutineService', () => {
  let service: RutineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RutineService],
    }).compile();

    service = module.get<RutineService>(RutineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
