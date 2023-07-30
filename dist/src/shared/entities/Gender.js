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
exports.Gender = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Gender = class Gender {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "GenderId" }),
    __metadata("design:type", String)
], Gender.prototype, "genderId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name", length: 100 }),
    __metadata("design:type", String)
], Gender.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_1.Users, (users) => users.gender),
    __metadata("design:type", Array)
], Gender.prototype, "users", void 0);
Gender = __decorate([
    (0, typeorm_1.Index)("pk_gender_965578478", ["genderId"], { unique: true }),
    (0, typeorm_1.Entity)("Gender", { schema: "dbo" })
], Gender);
exports.Gender = Gender;
//# sourceMappingURL=Gender.js.map