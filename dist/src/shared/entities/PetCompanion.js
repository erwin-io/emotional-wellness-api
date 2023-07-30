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
exports.PetCompanion = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let PetCompanion = class PetCompanion {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "PetCompanionId" }),
    __metadata("design:type", String)
], PetCompanion.prototype, "petCompanionId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], PetCompanion.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_1.Users, (users) => users.petCompanion),
    __metadata("design:type", Array)
], PetCompanion.prototype, "users", void 0);
PetCompanion = __decorate([
    (0, typeorm_1.Index)("PetCompanion_pkey", ["petCompanionId"], { unique: true }),
    (0, typeorm_1.Entity)("PetCompanion", { schema: "dbo" })
], PetCompanion);
exports.PetCompanion = PetCompanion;
//# sourceMappingURL=PetCompanion.js.map