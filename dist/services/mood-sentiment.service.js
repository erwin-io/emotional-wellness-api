"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoodSentimentService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
const mood_entity_enum_1 = require("../common/enums/mood-entity.enum");
let MoodSentimentService = class MoodSentimentService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getSentimentAnalysis(text) {
        const translated = await this.translateToEnglish(text);
        const sentiment = require('multilang-sentiment');
        const result = sentiment(translated, 'en');
        let moodEntityId;
        let name;
        if (result.positiveScore > 0 && result.score <= result.positiveScore) {
            if (result.positiveScore >= 4) {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.AMAZING.toString();
                name = "Amazing";
            }
            else if (result.positiveScore >= 1 && result.positiveScore <= 3) {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.FEELING_HAPPY.toString();
                name = "Happy";
            }
            else {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString();
                name = "Good";
            }
        }
        else if (result.negativeScore < 0 && result.score >= result.negativeScore) {
            if (result.negativeScore <= -1 && result.negativeScore >= -2) {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.FEELING_SAD.toString();
                name = "Sad";
            }
            else if (result.negativeScore <= -3) {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.ANGRY.toString();
                name = "Angry";
            }
            else {
                moodEntityId = mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString();
                name = "Sad";
            }
        }
        else {
            moodEntityId = mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString();
            name = "Good";
        }
        return { moodEntityId, name };
    }
    async translateToEnglish(text) {
        const target = "ceb";
        const url = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=" + target + "&tl=en&dt=t&q=" + text;
        const result = await (0, rxjs_1.firstValueFrom)(this.httpService
            .post(url, {
            responseType: "stream",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .pipe((0, rxjs_1.catchError)((error) => {
            throw new common_1.HttpException(error.response.data, common_1.HttpStatus.BAD_REQUEST);
        })));
        return result.data[0][0][0];
    }
};
MoodSentimentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], MoodSentimentService);
exports.MoodSentimentService = MoodSentimentService;
//# sourceMappingURL=mood-sentiment.service.js.map