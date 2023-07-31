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
exports.MoodSentimentController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const get_user_decorator_1 = require("../../common/decorator/get-user.decorator");
const jwt_auth_guard_1 = require("../../core/auth/jwt.auth.guard");
const user_update_dto_1 = require("../../core/dto/users/user.update.dto");
const mood_sentiment_service_1 = require("../../services/mood-sentiment.service");
let MoodSentimentController = class MoodSentimentController {
    constructor(moodSentimentService) {
        this.moodSentimentService = moodSentimentService;
    }
    async findByDate(text = "", user) {
        const res = {};
        try {
            res.data = await this.moodSentimentService.getSentimentAnalysis(text);
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
    (0, common_1.Get)("getSentimentAnalysis"),
    (0, swagger_1.ApiQuery)({ name: "text", required: true }),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, common_1.Query)("text")),
    __param(1, (0, get_user_decorator_1.GetUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_update_dto_1.UserDto]),
    __metadata("design:returntype", Promise)
], MoodSentimentController.prototype, "findByDate", null);
MoodSentimentController = __decorate([
    (0, swagger_1.ApiTags)("mood-sentiment"),
    (0, common_1.Controller)("mood-sentiment"),
    (0, swagger_1.ApiBearerAuth)("jwt"),
    __metadata("design:paramtypes", [mood_sentiment_service_1.MoodSentimentService])
], MoodSentimentController);
exports.MoodSentimentController = MoodSentimentController;
//# sourceMappingURL=mood-sentiment.controller.js.map