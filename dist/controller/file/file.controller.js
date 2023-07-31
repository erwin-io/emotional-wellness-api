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
exports.FileController = exports.FileDto = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const jwt_auth_guard_1 = require("../../core/auth/jwt.auth.guard");
const user_update_dto_1 = require("../../core/dto/users/user.update.dto");
class FileDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], FileDto.prototype, "fileName", void 0);
exports.FileDto = FileDto;
let FileController = class FileController {
    constructor() { }
    async getFile(fileName, res) {
        try {
        }
        catch (ex) {
            res.json({ message: ex.message });
        }
    }
    async upload(dto, res) {
        try {
            res.contentType("image/jpeg");
            res.send(Buffer.from(dto.userProfilePic.data));
        }
        catch (ex) {
            res.json({ message: ex.message });
        }
    }
};
__decorate([
    (0, common_1.Get)(":fileName"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Param)("fileName")),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "getFile", null);
__decorate([
    (0, common_1.Put)("upload"),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_update_dto_1.UpdateProfilePictureDto, Object]),
    __metadata("design:returntype", Promise)
], FileController.prototype, "upload", null);
FileController = __decorate([
    (0, swagger_1.ApiTags)("file"),
    (0, common_1.Controller)("file"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [])
], FileController);
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map