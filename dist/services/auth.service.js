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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../services/users.service");
const jwt_1 = require("@nestjs/jwt");
const fs = require("fs");
const path = require("path");
const utils_1 = require("../common/utils/utils");
const notification_service_1 = require("./notification.service");
const user_activity_log_service_1 = require("./user-activity-log.service");
const activity_type_enum_1 = require("../common/enums/activity-type.enum");
let AuthService = class AuthService {
    constructor(usersService, userActivityLogService, notificationService, jwtService) {
        this.usersService = usersService;
        this.userActivityLogService = userActivityLogService;
        this.notificationService = notificationService;
        this.jwtService = jwtService;
    }
    async register(userDto) {
        return await this.usersService.registerUser(userDto);
    }
    async login({ mobileNumber, password }) {
        const user = await this.usersService.findByLogin(mobileNumber, password);
        const { userId, name, birthDate, age, gender, petCompanion } = user;
        const accessToken = await this.getAccessToken(userId);
        const refreshToken = await this.getRefreshToken(userId);
        await this.updateRefreshTokenInUser(refreshToken, userId);
        return {
            userId,
            mobileNumber,
            name,
            birthDate,
            age,
            gender,
            accessToken,
            refreshToken,
            petCompanion,
            userProfilePic: user.userProfilePic
                ? user.userProfilePic.file.url
                : null,
        };
    }
    async logOut(userId, headers) {
        var uaParser = require('ua-parser-js');
        let uaInfo = uaParser(headers['user-agent']);
        await this.userActivityLogService.log(activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString(), userId, new Date(), uaInfo.os.name, uaInfo.os.version, uaInfo.browser.name);
        await this.updateRefreshTokenInUser(null, userId);
    }
    getAccessToken(userId) {
        const secret = fs.readFileSync(path.join(__dirname, "../../private.key"));
        const expiresIn = "1hr";
        const user = { userId };
        const accessToken = this.jwtService.sign(user, {
            secret: secret,
            expiresIn: expiresIn,
            algorithm: "RS256",
        });
        return accessToken;
    }
    async getRefreshToken(userId) {
        const secret = fs.readFileSync(path.join(__dirname, "../../refreshtoken.private.key"));
        const expiresIn = "1hr";
        const user = { userId };
        const accessToken = this.jwtService.sign(user, {
            secret: secret,
            expiresIn: expiresIn,
            algorithm: "RS256",
        });
        return accessToken;
    }
    async updateRefreshTokenInUser(refreshToken, userId) {
        if (refreshToken) {
            refreshToken = await (0, utils_1.hash)(refreshToken);
        }
        return await this.usersService.setCurrentRefreshToken(refreshToken, userId);
    }
    async getNewAccessAndRefreshToken(userId) {
        const refreshToken = await this.getRefreshToken(userId);
        await this.updateRefreshTokenInUser(refreshToken, userId);
        return {
            accessToken: await this.getAccessToken(userId),
            refreshToken: refreshToken,
        };
    }
    async getUserIfRefreshTokenMatches(refreshToken, userId) {
        const result = await this.usersService.getRefreshTokenUserById(userId);
        const isRefreshTokenMatching = await (0, utils_1.compare)(result.refresh_token, refreshToken);
        if (isRefreshTokenMatching) {
            await this.updateRefreshTokenInUser(null, userId);
            return result;
        }
        else {
            throw new common_1.UnauthorizedException();
        }
    }
    async findByMobileNumber(mobileNumber) {
        return await this.usersService.findByMobileNumber(mobileNumber);
    }
    verifyJwt(jwt) {
        try {
            return this.jwtService.verifyAsync(jwt, {
                secret: fs.readFileSync(path.join(__dirname, "../../private.key")),
                algorithms: ["RS256"],
            });
        }
        catch (ex) {
            throw ex;
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        user_activity_log_service_1.UserActivityLogService,
        notification_service_1.NotificationService,
        jwt_1.JwtService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map