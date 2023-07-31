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
exports.UserActivityLog = void 0;
const typeorm_1 = require("typeorm");
const UserActivityType_1 = require("./UserActivityType");
const Users_1 = require("./Users");
let UserActivityLog = class UserActivityLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserActivityLogId" }),
    __metadata("design:type", String)
], UserActivityLog.prototype, "userActivityLogId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", { name: "Date" }),
    __metadata("design:type", Date)
], UserActivityLog.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OS" }),
    __metadata("design:type", String)
], UserActivityLog.prototype, "os", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "OSVersion", default: () => "0" }),
    __metadata("design:type", String)
], UserActivityLog.prototype, "osVersion", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Browser" }),
    __metadata("design:type", String)
], UserActivityLog.prototype, "browser", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => UserActivityType_1.UserActivityType, (userActivityType) => userActivityType.userActivityLogs),
    (0, typeorm_1.JoinColumn)([
        { name: "UserActivityTypeId", referencedColumnName: "userActivityTypeId" },
    ]),
    __metadata("design:type", UserActivityType_1.UserActivityType)
], UserActivityLog.prototype, "userActivityType", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.userActivityLogs),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], UserActivityLog.prototype, "user", void 0);
UserActivityLog = __decorate([
    (0, typeorm_1.Index)("pk_useractivitylog", ["userActivityLogId"], { unique: true }),
    (0, typeorm_1.Entity)("UserActivityLog", { schema: "dbo" })
], UserActivityLog);
exports.UserActivityLog = UserActivityLog;
//# sourceMappingURL=UserActivityLog.js.map