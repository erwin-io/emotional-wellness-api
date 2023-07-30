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
exports.NotificationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const notification_service_1 = require("../../services/notification.service");
const notification_dtos_1 = require("../../core/dto/notification/notification.dtos");
let NotificationController = class NotificationController {
    constructor(notificationService) {
        this.notificationService = notificationService;
    }
    async getAllByUserIdPage(userId = "", page = 1, limit = 10) {
        const res = {};
        try {
            page = page <= 0 ? 1 : page;
            limit = limit > 40 ? 40 : limit;
            const result = await this.notificationService.getAllByUserIdPage(userId, {
                page,
                limit,
            });
            res.data = result;
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async getTotalUnreadByUserId(userId = "") {
        const res = {};
        try {
            res.data = await this.notificationService.getTotalUnreadByUserId(userId);
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateReadStatus(dto) {
        const res = {};
        try {
            const res = {};
            res.data = await this.notificationService.updateReadStatus(dto);
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
    (0, common_1.Get)("getAllByUserIdPage"),
    (0, swagger_1.ApiQuery)({ name: "userId", required: false }),
    (0, swagger_1.ApiQuery)({
        name: "page",
        description: "page",
        required: true,
        type: Number,
    }),
    (0, swagger_1.ApiQuery)({
        name: "limit",
        description: "limit",
        required: true,
        type: Number,
    }),
    __param(0, (0, common_1.Query)("userId")),
    __param(1, (0, common_1.Query)("page", new common_1.DefaultValuePipe(1), common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)("limit", new common_1.DefaultValuePipe(10), common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getAllByUserIdPage", null);
__decorate([
    (0, common_1.Get)("getTotalUnreadByUserId"),
    (0, swagger_1.ApiQuery)({ name: "userId", required: false }),
    __param(0, (0, common_1.Query)("userId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "getTotalUnreadByUserId", null);
__decorate([
    (0, common_1.Put)("updateReadStatus"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [notification_dtos_1.NotificationsDto]),
    __metadata("design:returntype", Promise)
], NotificationController.prototype, "updateReadStatus", null);
NotificationController = __decorate([
    (0, swagger_1.ApiTags)("notification"),
    (0, common_1.Controller)("notification"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [notification_service_1.NotificationService])
], NotificationController);
exports.NotificationController = NotificationController;
//# sourceMappingURL=notification.controller.js.map