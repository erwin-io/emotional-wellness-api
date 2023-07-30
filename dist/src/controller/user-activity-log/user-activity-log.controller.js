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
exports.UserActivityLogController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const user_activity_log_service_1 = require("../../services/user-activity-log.service");
const moment = require("moment");
let UserActivityLogController = class UserActivityLogController {
    constructor(userActivityLogService) {
        this.userActivityLogService = userActivityLogService;
    }
    async getUserLogActivity(userTypeId = 0, activityTypeId = "", name = "", dateFrom = new Date(), dateTo = new Date()) {
        const res = {};
        try {
            res.data = await this.userActivityLogService.findByFilter(userTypeId.toString(), activityTypeId.toString().split(","), name, new Date(moment(dateFrom).format("YYYY-MM-DD")), new Date(moment(dateTo).format("YYYY-MM-DD")));
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
    (0, common_1.Get)("getUserLogActivity"),
    (0, swagger_1.ApiQuery)({ name: "userTypeId", required: false }),
    (0, swagger_1.ApiQuery)({ name: "activityTypeId", required: false }),
    (0, swagger_1.ApiQuery)({ name: "name", required: false }),
    (0, swagger_1.ApiQuery)({ name: "dateFrom", required: false }),
    (0, swagger_1.ApiQuery)({ name: "dateTo", required: false }),
    __param(0, (0, common_1.Query)("userTypeId")),
    __param(1, (0, common_1.Query)("activityTypeId")),
    __param(2, (0, common_1.Query)("name")),
    __param(3, (0, common_1.Query)("dateFrom")),
    __param(4, (0, common_1.Query)("dateTo")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, String, Object, Object]),
    __metadata("design:returntype", Promise)
], UserActivityLogController.prototype, "getUserLogActivity", null);
UserActivityLogController = __decorate([
    (0, swagger_1.ApiTags)("activity-log"),
    (0, common_1.Controller)("activity-log"),
    __metadata("design:paramtypes", [user_activity_log_service_1.UserActivityLogService])
], UserActivityLogController);
exports.UserActivityLogController = UserActivityLogController;
//# sourceMappingURL=user-activity-log.controller.js.map