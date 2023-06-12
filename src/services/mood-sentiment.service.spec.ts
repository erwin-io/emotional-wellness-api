import { Test, TestingModule } from '@nestjs/testing';
import { MoodSentimentService } from './mood-sentiment.service';

describe('MoodSentimentService', () => {
  let service: MoodSentimentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoodSentimentService],
    }).compile();

    service = module.get<MoodSentimentService>(MoodSentimentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
