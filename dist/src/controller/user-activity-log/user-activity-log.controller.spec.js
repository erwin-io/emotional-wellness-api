"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const user_activity_log_controller_1 = require("./user-activity-log.controller");
describe('ActivityLogController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [user_activity_log_controller_1.UserActivityLogController],
        }).compile();
        controller = module.get(user_activity_log_controller_1.UserActivityLogController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=user-activity-log.controller.spec.js.map