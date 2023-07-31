"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mood_sentiment_service_1 = require("./mood-sentiment.service");
describe('MoodSentimentService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [mood_sentiment_service_1.MoodSentimentService],
        }).compile();
        service = module.get(mood_sentiment_service_1.MoodSentimentService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=mood-sentiment.service.spec.js.map