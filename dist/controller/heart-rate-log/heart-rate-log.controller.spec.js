"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const heart_rate_log_controller_1 = require("./heart-rate-log.controller");
describe('HeartRateLogController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [heart_rate_log_controller_1.HeartRateLogController],
        }).compile();
        controller = module.get(heart_rate_log_controller_1.HeartRateLogController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=heart-rate-log.controller.spec.js.map