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
exports.SystemConfigController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const system_config_update_dto_1 = require("../../core/dto/system-config/system-config.update.dto");
const system_config_service_1 = require("../../services/system-config.service");
let SystemConfigController = class SystemConfigController {
    constructor(systemConfigService) {
        this.systemConfigService = systemConfigService;
    }
    async findAll() {
        const res = {};
        try {
            res.data = await this.systemConfigService.getAll();
            res.success = true;
            return res;
        }
        catch (e) {
            res.success = false;
            res.message = e.message !== undefined ? e.message : e;
            return res;
        }
    }
    async updateUser(dto) {
        const res = {};
        try {
            const res = {};
            res.data = await this.systemConfigService.update(dto);
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
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SystemConfigController.prototype, "findAll", null);
__decorate([
    (0, common_1.Put)(""),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [system_config_update_dto_1.SystemConfigDto]),
    __metadata("design:returntype", Promise)
], SystemConfigController.prototype, "updateUser", null);
SystemConfigController = __decorate([
    (0, swagger_1.ApiTags)("system-config"),
    (0, common_1.Controller)("system-config"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [system_config_service_1.SystemConfigService])
], SystemConfigController);
exports.SystemConfigController = SystemConfigController;
//# sourceMappingURL=system-config.controller.js.map