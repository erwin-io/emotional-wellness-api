"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const journal_entry_service_1 = require("./journal-entry.service");
describe('JournalEntryService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [journal_entry_service_1.JournalEntryService],
        }).compile();
        service = module.get(journal_entry_service_1.JournalEntryService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=journal-entry.service.spec.js.map