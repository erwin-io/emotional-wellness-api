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
exports.UserActivityType = void 0;
const typeorm_1 = require("typeorm");
const UserActivityLog_1 = require("./UserActivityLog");
let UserActivityType = class UserActivityType {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "UserActivityTypeId" }),
    __metadata("design:type", String)
], UserActivityType.prototype, "userActivityTypeId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], UserActivityType.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserActivityLog_1.UserActivityLog, (userActivityLog) => userActivityLog.userActivityType),
    __metadata("design:type", Array)
], UserActivityType.prototype, "userActivityLogs", void 0);
UserActivityType = __decorate([
    (0, typeorm_1.Index)("UserActivityType_pkey", ["userActivityTypeId"], { unique: true }),
    (0, typeorm_1.Entity)("UserActivityType", { schema: "dbo" })
], UserActivityType);
exports.UserActivityType = UserActivityType;
//# sourceMappingURL=UserActivityType.js.map