import { Module } from '@nestjs/common';
import { MoodSentimentController } from './mood-sentiment.controller';
import { HttpModule } from '@nestjs/axios';
import { MoodSentimentService } from 'src/services/mood-sentiment.service';

@Module({
  imports: [HttpModule],
  controllers: [MoodSentimentController],
  providers: [MoodSentimentService],
  exports: [MoodSentimentService],
})
export class MoodSentimentModule {}
