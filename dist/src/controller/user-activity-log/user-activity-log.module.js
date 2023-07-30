"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserActivityLogModule = void 0;
const common_1 = require("@nestjs/common");
const user_activity_log_controller_1 = require("./user-activity-log.controller");
const user_activity_log_service_1 = require("../../services/user-activity-log.service");
const typeorm_1 = require("@nestjs/typeorm");
const UserActivityLog_1 = require("../../shared/entities/UserActivityLog");
const users_module_1 = require("../users/users.module");
let UserActivityLogModule = class UserActivityLogModule {
};
UserActivityLogModule = __decorate([
    (0, common_1.Module)({
        imports: [
            users_module_1.UsersModule,
            typeorm_1.TypeOrmModule.forFeature([UserActivityLog_1.UserActivityLog]),
        ],
        controllers: [user_activity_log_controller_1.UserActivityLogController],
        providers: [user_activity_log_service_1.UserActivityLogService],
        exports: [user_activity_log_service_1.UserActivityLogService],
    })
], UserActivityLogModule);
exports.UserActivityLogModule = UserActivityLogModule;
//# sourceMappingURL=user-activity-log.module.js.map