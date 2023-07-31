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
exports.JournalEntry = void 0;
const typeorm_1 = require("typeorm");
const EntityStatus_1 = require("./EntityStatus");
const HeartRateLog_1 = require("./HeartRateLog");
const MoodEntity_1 = require("./MoodEntity");
const Users_1 = require("./Users");
let JournalEntry = class JournalEntry {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "JournalEntryId" }),
    __metadata("design:type", String)
], JournalEntry.prototype, "journalEntryId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Notes" }),
    __metadata("design:type", String)
], JournalEntry.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "Timestamp",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], JournalEntry.prototype, "timestamp", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EntityStatus_1.EntityStatus, (entityStatus) => entityStatus.journalEntries),
    (0, typeorm_1.JoinColumn)([
        { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
    ]),
    __metadata("design:type", EntityStatus_1.EntityStatus)
], JournalEntry.prototype, "entityStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => HeartRateLog_1.HeartRateLog, (heartRateLog) => heartRateLog.journalEntries),
    (0, typeorm_1.JoinColumn)([
        { name: "HeartRateLogId", referencedColumnName: "heartRateLogId" },
    ]),
    __metadata("design:type", HeartRateLog_1.HeartRateLog)
], JournalEntry.prototype, "heartRateLog", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => MoodEntity_1.MoodEntity, (moodEntity) => moodEntity.journalEntries),
    (0, typeorm_1.JoinColumn)([{ name: "MoodEntityId", referencedColumnName: "moodEntityId" }]),
    __metadata("design:type", MoodEntity_1.MoodEntity)
], JournalEntry.prototype, "moodEntity", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Users_1.Users, (users) => users.journalEntries),
    (0, typeorm_1.JoinColumn)([{ name: "UserId", referencedColumnName: "userId" }]),
    __metadata("design:type", Users_1.Users)
], JournalEntry.prototype, "user", void 0);
JournalEntry = __decorate([
    (0, typeorm_1.Index)("JournalEntry_pkey", ["journalEntryId"], { unique: true }),
    (0, typeorm_1.Entity)("JournalEntry", { schema: "dbo" })
], JournalEntry);
exports.JournalEntry = JournalEntry;
//# sourceMappingURL=JournalEntry.js.map