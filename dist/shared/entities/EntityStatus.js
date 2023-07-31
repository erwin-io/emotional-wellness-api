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
exports.EntityStatus = void 0;
const typeorm_1 = require("typeorm");
const JournalEntry_1 = require("./JournalEntry");
const Notifications_1 = require("./Notifications");
const Users_1 = require("./Users");
let EntityStatus = class EntityStatus {
};
__decorate([
    (0, typeorm_1.Column)("bigint", { primary: true, name: "EntityStatusId" }),
    __metadata("design:type", String)
], EntityStatus.prototype, "entityStatusId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name", length: 100 }),
    __metadata("design:type", String)
], EntityStatus.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntry_1.JournalEntry, (journalEntry) => journalEntry.entityStatus),
    __metadata("design:type", Array)
], EntityStatus.prototype, "journalEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notifications_1.Notifications, (notifications) => notifications.entityStatus),
    __metadata("design:type", Array)
], EntityStatus.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Users_1.Users, (users) => users.entityStatus),
    __metadata("design:type", Array)
], EntityStatus.prototype, "users", void 0);
EntityStatus = __decorate([
    (0, typeorm_1.Index)("pk_entitystatus_869578136", ["entityStatusId"], { unique: true }),
    (0, typeorm_1.Entity)("EntityStatus", { schema: "dbo" })
], EntityStatus);
exports.EntityStatus = EntityStatus;
//# sourceMappingURL=EntityStatus.js.map