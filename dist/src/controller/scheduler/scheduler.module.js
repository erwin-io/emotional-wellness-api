"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchedulerModule = void 0;
const common_1 = require("@nestjs/common");
const firebase_provider_module_1 = require("../../core/provider/firebase/firebase-provider.module");
const scheduler_service_1 = require("../../services/scheduler.service");
const notification_module_1 = require("../notification/notification.module");
const scheduler_controller_1 = require("./scheduler.controller");
const users_module_1 = require("../users/users.module");
const system_config_module_1 = require("../system-config/system-config.module");
let SchedulerModule = class SchedulerModule {
};
SchedulerModule = __decorate([
    (0, common_1.Module)({
        imports: [
            system_config_module_1.SystemConfigModule,
            users_module_1.UsersModule,
            notification_module_1.NotificationModule,
            firebase_provider_module_1.FirebaseProviderModule,
        ],
        controllers: [scheduler_controller_1.SchedulerController],
        providers: [scheduler_service_1.SchedulerService],
        exports: [scheduler_service_1.SchedulerService],
    })
], SchedulerModule);
exports.SchedulerModule = SchedulerModule;
//# sourceMappingURL=scheduler.module.js.map