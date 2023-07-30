"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HeartRateLogModule = void 0;
const common_1 = require("@nestjs/common");
const heart_rate_log_controller_1 = require("./heart-rate-log.controller");
const heart_rate_log_service_1 = require("../../services/heart-rate-log.service");
const HeartRateLog_1 = require("../../shared/entities/HeartRateLog");
const typeorm_1 = require("@nestjs/typeorm");
let HeartRateLogModule = class HeartRateLogModule {
};
HeartRateLogModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([HeartRateLog_1.HeartRateLog])],
        controllers: [heart_rate_log_controller_1.HeartRateLogController],
        providers: [heart_rate_log_service_1.HeartRateLogService],
        exports: [heart_rate_log_service_1.HeartRateLogService],
    })
], HeartRateLogModule);
exports.HeartRateLogModule = HeartRateLogModule;
//# sourceMappingURL=heart-rate-log.module.js.map