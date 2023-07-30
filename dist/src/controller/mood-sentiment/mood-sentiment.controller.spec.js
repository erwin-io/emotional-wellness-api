"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const mood_sentiment_controller_1 = require("./mood-sentiment.controller");
describe('MoodSentimentController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [mood_sentiment_controller_1.MoodSentimentController],
        }).compile();
        controller = module.get(mood_sentiment_controller_1.MoodSentimentController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=mood-sentiment.controller.spec.js.map