"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const journal_entry_controller_1 = require("./journal-entry.controller");
describe('JournalEntryController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [journal_entry_controller_1.JournalEntryController],
        }).compile();
        controller = module.get(journal_entry_controller_1.JournalEntryController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=journal-entry.controller.spec.js.map