"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const scheduler_controller_1 = require("./scheduler.controller");
describe('SchedulerController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [scheduler_controller_1.SchedulerController],
        }).compile();
        controller = module.get(scheduler_controller_1.SchedulerController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=scheduler.controller.spec.js.map