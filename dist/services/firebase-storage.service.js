"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FirebaseStorageService = void 0;
const common_1 = require("@nestjs/common");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const storage_1 = require("@firebase/storage");
let FirebaseStorageService = class FirebaseStorageService {
    constructor(firebaseProvoder) {
        this.firebaseProvoder = firebaseProvoder;
    }
    uploadProfilePicture(fileName, data) {
        const storage = (0, storage_1.getStorage)();
        const storageRef = (0, storage_1.ref)(storage, "profile/" + fileName);
        (0, storage_1.uploadString)(storageRef, data, "data_url").then((snapshot) => {
            console.log("Uploaded a data_url string!");
        });
    }
};
FirebaseStorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider])
], FirebaseStorageService);
exports.FirebaseStorageService = FirebaseStorageService;
//# sourceMappingURL=firebase-storage.service.js.map