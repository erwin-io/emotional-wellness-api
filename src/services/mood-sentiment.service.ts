/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from "@nestjs/axios";
import { firstValueFrom, catchError } from 'rxjs';
// import sentiment from 'multilang-sentiment';
import { SentimentViewModel } from '../core/view-model/sentiment.view-model';
import { MoodEntityEnum } from 'src/common/enums/mood-entity.enum';

@Injectable()
export class MoodSentimentService {
    constructor(
        private readonly httpService: HttpService,
    ) {}
    
    async getSentimentAnalysis(text: string) {
        const translated = await this.translateToEnglish(text);
        const sentiment = require('multilang-sentiment');

        const result: SentimentViewModel = sentiment(translated, 'en');
        let moodEntityId;
        let name;
        if(result.positiveScore > 0 && result.score <= result.positiveScore) {
            if(result.positiveScore >= 4) {
                moodEntityId = MoodEntityEnum.AMAZING.toString();
                name = "Amazing";
            } else if(result.positiveScore >= 1 && result.positiveScore <= 3) {
                moodEntityId = MoodEntityEnum.FEELING_HAPPY.toString();
                name = "Happy";
            } else {
                moodEntityId = MoodEntityEnum.I_AM_GOOD.toString();
                name = "Good";
            }
        } else if(result.negativeScore < 0 && result.score >= result.negativeScore) {
            if(result.negativeScore <= -1 && result.negativeScore >= -2) {
                moodEntityId = MoodEntityEnum.FEELING_SAD.toString();
                name = "Sad";
            } else if(result.negativeScore <= -3) {
                moodEntityId = MoodEntityEnum.ANGRY.toString();
                name = "Angry";
            } else {
                moodEntityId = MoodEntityEnum.I_AM_GOOD.toString();
                name = "Sad";
            }
        } else {
            moodEntityId = MoodEntityEnum.I_AM_GOOD.toString();
            name = "Good";
        }
        return { moodEntityId, name };
    }

    private async translateToEnglish(text: string) {
        const target = "ceb";
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + target + "&tl=en&dt=t&q=" + text;
        const result = await firstValueFrom(
          this.httpService
            .post<any>(url, {
              responseType: "stream",
              headers: {
                "Content-Type": "application/json",
              },
            })
            .pipe(
              catchError((error) => {
                throw new HttpException(
                  error.response.data,
                  HttpStatus.BAD_REQUEST
                );
              })
            )
        );
      return result.data[0][0][0];
    }
}
