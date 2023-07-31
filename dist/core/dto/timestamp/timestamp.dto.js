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
exports.TimestampDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const moment = require("moment");
class TimestampDto {
    constructor() {
        this.locale = "en-US";
        this.timeZone = "Asia/Manila";
        this.date = new Date();
    }
}
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "en-US"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TimestampDto.prototype, "locale", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        default: "Asia/Manila"
    }),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TimestampDto.prototype, "timeZone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Date,
        default: moment.utc(new Date()).format(),
    }),
    (0, class_transformer_1.Type)(() => Date),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Date)
], TimestampDto.prototype, "date", void 0);
exports.TimestampDto = TimestampDto;
//# sourceMappingURL=timestamp.dto.js.map