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
exports.UpdatePetCompanionDto = exports.UpdateProfilePictureDto = exports.UpdateFirebaseToken = exports.UpdatePasswordDto = exports.UpdateUserDto = exports.UserProfilePicDto = exports.UserDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
class UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserDto.prototype, "userId", void 0);
exports.UserDto = UserDto;
class UserProfilePicDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserProfilePicDto.prototype, "fileName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UserProfilePicDto.prototype, "data", void 0);
exports.UserProfilePicDto = UserProfilePicDto;
class UpdateUserDto extends UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsDate)(),
    (0, class_transformer_1.Type)(() => Date),
    __metadata("design:type", Date)
], UpdateUserDto.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "genderId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => UserProfilePicDto),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", UserProfilePicDto)
], UpdateUserDto.prototype, "userProfilePic", void 0);
exports.UpdateUserDto = UpdateUserDto;
class UpdatePasswordDto extends UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePasswordDto.prototype, "password", void 0);
exports.UpdatePasswordDto = UpdatePasswordDto;
class UpdateFirebaseToken extends UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateFirebaseToken.prototype, "firebaseToken", void 0);
exports.UpdateFirebaseToken = UpdateFirebaseToken;
class UpdateProfilePictureDto extends UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateProfilePictureDto.prototype, "userProfilePic", void 0);
exports.UpdateProfilePictureDto = UpdateProfilePictureDto;
class UpdatePetCompanionDto extends UserDto {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], UpdatePetCompanionDto.prototype, "petCompanionId", void 0);
exports.UpdatePetCompanionDto = UpdatePetCompanionDto;
//# sourceMappingURL=user.update.dto.js.map