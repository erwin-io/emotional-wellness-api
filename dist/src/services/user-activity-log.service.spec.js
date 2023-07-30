"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_activity_log_service_1 = require("./user-activity-log.service");
describe('UserActivityLogService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [user_activity_log_service_1.UserActivityLogService],
        }).compile();
        service = module.get(user_activity_log_service_1.UserActivityLogService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=user-activity-log.service.spec.js.map