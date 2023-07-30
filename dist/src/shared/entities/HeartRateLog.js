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
exports.HeartRateLog = void 0;
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
const JournalEntry_1 = require("./JournalEntry");
let HeartRateLog = class HeartRateLog {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "HeartRateLogId" }),
    __metadata("design:type", String)
], HeartRateLog.prototype, "heartRateLogId", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "Timestamp",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], HeartRateLog.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Value" }),
    __metadata("design:type", String)
], HeartRateLog.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.heartRateLogs),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], HeartRateLog.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntry_1.JournalEntry, (journalEntry) => journalEntry.heartRateLog),
    __metadata("design:type", Array)
], HeartRateLog.prototype, "journalEntries", void 0);
HeartRateLog = __decorate([
    (0, typeorm_1.Index)("HeartRateLog_pkey", ["heartRateLogId"], { unique: true }),
    (0, typeorm_1.Entity)("HeartRateLog", { schema: "dbo" })
], HeartRateLog);
exports.HeartRateLog = HeartRateLog;
//# sourceMappingURL=HeartRateLog.js.map