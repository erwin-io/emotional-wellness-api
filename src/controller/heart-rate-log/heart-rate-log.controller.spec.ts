import { Test, TestingModule } from '@nestjs/testing';
import { HeartRateLogController } from './heart-rate-log.controller';

describe('HeartRateLogController', () => {
  let controller: HeartRateLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeartRateLogController],
    }).compile();

    controller = module.get<HeartRateLogController>(HeartRateLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
