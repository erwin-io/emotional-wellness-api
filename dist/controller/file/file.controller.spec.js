"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const file_controller_1 = require("./file.controller");
describe('FileController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [file_controller_1.FileController],
        }).compile();
        controller = module.get(file_controller_1.FileController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=file.controller.spec.js.map