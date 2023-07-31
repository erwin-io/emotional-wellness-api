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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JournalEntryController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../../common/decorator/get-user.decorator");
const jwt_auth_guard_1 = require("../../core/auth/jwt.auth.guard");
const journal_entry_create_dto_1 = require("../../core/dto/journal-entry/journal-entry.create.dto");
const journal_entry_update_dto_1 = require("../../core/dto/journal-entry/journal-entry.update.dto");
const user_update_dto_1 = require("../../core/dto/users/user.update.dto");
const journal_entry_service_1 = require("../../services/journal-entry.service");
let JournalEntryController = class JournalEntryController {
    constructor(journalEntryService) {
        this.journalEntryService = journalEntryService;
    }
    async findByDate(dateFrom = new Date(), dateTo = new Date(), user) {
        const res = {};
        try {
            res.data = await this.journalEntryService.findByDate(user.userId, new Date(dateFrom), new Date(dateTo));
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getDateSummary(date = new Date(), user) {
        const res = {};
        try {
            res.data = await this.journalEntryService.getDateSummary(user.userId, new Date(date));
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getWeeklySummary(date = new Date(), user) {
        const res = {};
        try {
            res.data = await this.journalEntryService.getWeeklySummary(user.userId, new Date(date));
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getWeekly(date = new Date(), user) {
        const res = {};
        try {
            res.data = await this.journalEntryService.getWeekly(user.userId, new Date(date));
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async findOne(journalEntryId) {
        const res = {};
        try {
            res.data = await this.journalEntryService.findById(journalEntryId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(createJournalEntryDto, user) {
        const res = {};
        try {
            res.data = await this.journalEntryService.add(user.userId, createJournalEntryDto);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async update(dto) {
        const res = {};
        try {
            res.data = await this.journalEntryService.update(dto);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async delete(journalEntryId) {
        const res = {};
        try {
            const res = {};
            res.data = await this.journalEntryService.delete(journalEntryId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
};
__decorate([
    (0, common_1.Get)("findByDate"),
    (0, swagger_1.ApiQuery)({ name: "dateFrom", required: false }),
    (0, swagger_1.ApiQuery)({ name: "dateTo", required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)("dateFrom")),
    __param(1, (0, common_1.Query)("dateTo")),
    __param(2, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)("getDateSummary"),
    (0, swagger_1.ApiQuery)({ name: "date", required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)("date")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "getDateSummary", null);
__decorate([
    (0, common_1.Get)("getWeeklySummary"),
    (0, swagger_1.ApiQuery)({ name: "date", required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)("date")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "getWeeklySummary", null);
__decorate([
    (0, common_1.Get)("getWeekly"),
    (0, swagger_1.ApiQuery)({ name: "date", required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)("date")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "getWeekly", null);
__decorate([
    (0, common_1.Get)(":journalEntryId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("journalEntryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journal_entry_create_dto_1.CreateJournalEntryDto, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "create", null);
__decorate([
    (0, common_1.Put)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [journal_entry_update_dto_1.JournalEntryDto]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(":journalEntryId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("journalEntryId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], JournalEntryController.prototype, "delete", null);
JournalEntryController = __decorate([
    (0, swagger_1.ApiTags)("journal-entry"),
    (0, common_1.Controller)("journal-entry"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [journal_entry_service_1.JournalEntryService])
], JournalEntryController);
exports.JournalEntryController = JournalEntryController;
//# sourceMappingURL=journal-entry.controller.js.map