"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firebase_storage_service_1 = require("./firebase-storage.service");
describe('FirebaseStorageService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [firebase_storage_service_1.FirebaseStorageService],
        }).compile();
        service = module.get(firebase_storage_service_1.FirebaseStorageService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=firebase-storage.service.spec.js.map