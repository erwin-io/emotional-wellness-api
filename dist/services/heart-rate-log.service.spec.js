"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const heart_rate_log_service_1 = require("./heart-rate-log.service");
describe('HeartRateLogService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [heart_rate_log_service_1.HeartRateLogService],
        }).compile();
        service = module.get(heart_rate_log_service_1.HeartRateLogService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=heart-rate-log.service.spec.js.map