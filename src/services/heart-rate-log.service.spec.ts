import { Test, TestingModule } from '@nestjs/testing';
import { HeartRateLogService } from './heart-rate-log.service';

describe('HeartRateLogService', () => {
  let service: HeartRateLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeartRateLogService],
    }).compile();

    service = module.get<HeartRateLogService>(HeartRateLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
