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
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const GatewayConnectedUsers_1 = require("./GatewayConnectedUsers");
const HeartRateLog_1 = require("./HeartRateLog");
const JournalEntry_1 = require("./JournalEntry");
const Notifications_1 = require("./Notifications");
const UserActivityLog_1 = require("./UserActivityLog");
const UserProfilePic_1 = require("./UserProfilePic");
const EntityStatus_1 = require("./EntityStatus");
const Gender_1 = require("./Gender");
const PetCompanion_1 = require("./PetCompanion");
let Users = class Users {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)({ type: "bigint", name: "UserId" }),
    __metadata("design:type", String)
], Users.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Name" }),
    __metadata("design:type", String)
], Users.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "MobileNumber" }),
    __metadata("design:type", String)
], Users.prototype, "mobileNumber", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "BirthDate" }),
    __metadata("design:type", String)
], Users.prototype, "birthDate", void 0);
__decorate([
    (0, typeorm_1.Column)("bigint", { name: "Age" }),
    __metadata("design:type", String)
], Users.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)("character varying", { name: "Password" }),
    __metadata("design:type", String)
], Users.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "CurrentHashedRefreshToken", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "currentHashedRefreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "FirebaseToken", nullable: true }),
    __metadata("design:type", String)
], Users.prototype, "firebaseToken", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "Expire",
        default: () => "((now() AT TIME ZONE 'Asia/Manila') + '06:00:00'::interval)",
    }),
    __metadata("design:type", Date)
], Users.prototype, "expire", void 0);
__decorate([
    (0, typeorm_1.Column)("timestamp with time zone", {
        name: "LastJournalEntry",
        default: () => "(now() AT TIME ZONE 'Asia/Manila')",
    }),
    __metadata("design:type", Date)
], Users.prototype, "lastJournalEntry", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => GatewayConnectedUsers_1.GatewayConnectedUsers, (gatewayConnectedUsers) => gatewayConnectedUsers.user),
    __metadata("design:type", Array)
], Users.prototype, "gatewayConnectedUsers", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => HeartRateLog_1.HeartRateLog, (heartRateLog) => heartRateLog.user),
    __metadata("design:type", Array)
], Users.prototype, "heartRateLogs", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => JournalEntry_1.JournalEntry, (journalEntry) => journalEntry.user),
    __metadata("design:type", Array)
], Users.prototype, "journalEntries", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Notifications_1.Notifications, (notifications) => notifications.user),
    __metadata("design:type", Array)
], Users.prototype, "notifications", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => UserActivityLog_1.UserActivityLog, (userActivityLog) => userActivityLog.user),
    __metadata("design:type", Array)
], Users.prototype, "userActivityLogs", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => UserProfilePic_1.UserProfilePic, (userProfilePic) => userProfilePic.user),
    __metadata("design:type", UserProfilePic_1.UserProfilePic)
], Users.prototype, "userProfilePic", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => EntityStatus_1.EntityStatus, (entityStatus) => entityStatus.users),
    (0, typeorm_1.JoinColumn)([
        { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
    ]),
    __metadata("design:type", EntityStatus_1.EntityStatus)
], Users.prototype, "entityStatus", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Gender_1.Gender, (gender) => gender.users),
    (0, typeorm_1.JoinColumn)([{ name: "GenderId", referencedColumnName: "genderId" }]),
    __metadata("design:type", Gender_1.Gender)
], Users.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => PetCompanion_1.PetCompanion, (petCompanion) => petCompanion.users),
    (0, typeorm_1.JoinColumn)([
        { name: "PetCompanionId", referencedColumnName: "petCompanionId" },
    ]),
    __metadata("design:type", PetCompanion_1.PetCompanion)
], Users.prototype, "petCompanion", void 0);
Users = __decorate([
    (0, typeorm_1.Index)("pk_users_1557580587", ["userId"], { unique: true }),
    (0, typeorm_1.Entity)("Users", { schema: "dbo" })
], Users);
exports.Users = Users;
//# sourceMappingURL=Users.js.map