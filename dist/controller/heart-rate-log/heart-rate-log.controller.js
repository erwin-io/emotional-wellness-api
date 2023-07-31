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
exports.HeartRateLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../../common/decorator/get-user.decorator");
const jwt_auth_guard_1 = require("../../core/auth/jwt.auth.guard");
const heart_rate_log_create_dto_1 = require("../../core/dto/heart-rate-log/heart-rate-log.create.dto");
const user_update_dto_1 = require("../../core/dto/users/user.update.dto");
const heart_rate_log_service_1 = require("../../services/heart-rate-log.service");
let HeartRateLogController = class HeartRateLogController {
    constructor(heartRateLogService) {
        this.heartRateLogService = heartRateLogService;
    }
    async findByDate(dateFrom = new Date(), dateTo = new Date(), user) {
        const res = {};
        try {
            res.data = await this.heartRateLogService.findByDate(user.userId, new Date(dateFrom), new Date(dateTo));
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getHeartRateStatus(user, value = 0) {
        const res = {};
        try {
            res.data = await this.heartRateLogService.getHeartRateStatus(user.userId, value);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async findOne(heartRateLogId) {
        const res = {};
        try {
            res.data = await this.heartRateLogService.findById(heartRateLogId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async create(createHeartRateLogDto, user) {
        const res = {};
        try {
            res.data = await this.heartRateLogService.add(user.userId, createHeartRateLogDto);
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
], HeartRateLogController.prototype, "findByDate", null);
__decorate([
    (0, common_1.Get)("getHeartRateStatus"),
    (0, swagger_1.ApiQuery)({ name: "value", required: false }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, get_user_decorator_1.GetUser)()),
    __param(1, (0, common_1.Query)("value")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UserDto, Object]),
    __metadata("design:returntype", Promise)
], HeartRateLogController.prototype, "getHeartRateStatus", null);
__decorate([
    (0, common_1.Get)(":heartRateLogId"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("heartRateLogId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HeartRateLogController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [heart_rate_log_create_dto_1.CreateHeartRateLogDto, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], HeartRateLogController.prototype, "create", null);
HeartRateLogController = __decorate([
    (0, swagger_1.ApiTags)("heart-rate-log"),
    (0, common_1.Controller)("heart-rate-log"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [heart_rate_log_service_1.HeartRateLogService])
], HeartRateLogController);
exports.HeartRateLogController = HeartRateLogController;
//# sourceMappingURL=heart-rate-log.controller.js.map