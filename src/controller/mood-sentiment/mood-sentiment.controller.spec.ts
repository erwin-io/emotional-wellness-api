import { Test, TestingModule } from '@nestjs/testing';
import { MoodSentimentController } from './mood-sentiment.controller';

describe('MoodSentimentController', () => {
  let controller: MoodSentimentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoodSentimentController],
    }).compile();

    controller = module.get<MoodSentimentController>(MoodSentimentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
