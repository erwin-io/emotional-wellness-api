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
exports.UserActivityLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const activity_type_enum_1 = require("../common/enums/activity-type.enum");
const UserActivityLog_1 = require("../shared/entities/UserActivityLog");
const UserActivityType_1 = require("../shared/entities/UserActivityType");
const Users_1 = require("../shared/entities/Users");
const typeorm_2 = require("typeorm");
const users_service_1 = require("./users.service");
let UserActivityLogService = class UserActivityLogService {
    constructor(userActivityLogRepo, usersService) {
        this.userActivityLogRepo = userActivityLogRepo;
        this.usersService = usersService;
    }
    async findByFilter(userTypeId, userActivityTypeId, name, dateFrom, dateTo) {
        try {
            const params = {
                userActivityTypeId: userActivityTypeId.length === 0
                    ? [
                        activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString(),
                        activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString(),
                    ]
                    : userActivityTypeId,
                userTypeId,
                name: `%${name.toLowerCase()}%`,
            };
            dateFrom = new Date(dateFrom.setHours(0, 0, 0, 0));
            dateTo = new Date(new Date(dateTo.setDate(dateFrom.getDate() + 1)).setHours(0, 0, 0, 0));
            params.dateFrom = moment(dateFrom).format("YYYY-MM-DD HH:mm:ss");
            params.dateTo = moment(dateTo).format("YYYY-MM-DD HH:mm:ss");
            const query = await this.userActivityLogRepo.manager
                .createQueryBuilder("UserActivityLog", "al")
                .leftJoinAndSelect("al.userActivityType", "at")
                .leftJoinAndSelect("al.user", "u")
                .leftJoinAndSelect("u.staff", "s")
                .leftJoinAndSelect("u.userType", "ut")
                .where("(LOWER(u.mobileNumber) LIKE :name OR " +
                "LOWER(s.name) LIKE :name) AND " +
                "(al.date between :dateFrom AND :dateTo) AND " +
                "at.userActivityTypeId IN(:...userActivityTypeId) AND " +
                "ut.userTypeId = :userTypeId")
                .orderBy("al.date", "DESC")
                .setParameters(params)
                .getMany();
            return query.map((x) => {
                delete x.user.password;
                delete x.user.currentHashedRefreshToken;
                delete x.user.firebaseToken;
                return x;
            });
        }
        catch (e) {
            throw e;
        }
    }
    async log(userActivityTypeId, userId, date, os, osVersion, browser) {
        try {
            date = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
            return await this.userActivityLogRepo.manager.transaction(async (entityManager) => {
                if (Number(userActivityTypeId) === Number(activity_type_enum_1.ActivityTypeEnum.USER_LOGIN)) {
                    return this.userLogin(entityManager, userId, date, os, osVersion, browser);
                }
                else if (Number(userActivityTypeId) === Number(activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT)) {
                    return this.userLogout(entityManager, userId, date, os, osVersion, browser);
                }
            });
        }
        catch (e) {
            throw e;
        }
    }
    async userLogin(entityManager, userId, date, os, osVersion, browser) {
        const userActivityTypeId = activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString();
        let userActivityLog = new UserActivityLog_1.UserActivityLog();
        const lastActivitySameDevice = await entityManager.find(UserActivityLog_1.UserActivityLog, {
            where: {
                user: { userId },
                os,
                osVersion,
                browser,
            },
            order: {
                date: {
                    direction: "DESC",
                },
            },
            relations: {
                userActivityType: true,
            },
        });
        const lastActivityOtherDevice = await entityManager.find(UserActivityLog_1.UserActivityLog, {
            where: [
                {
                    user: { userId },
                    os: (0, typeorm_2.Not)(os),
                    osVersion: osVersion,
                    browser: browser,
                },
                {
                    user: { userId },
                    os: os,
                    osVersion: (0, typeorm_2.Not)(osVersion),
                    browser: browser,
                },
                {
                    user: { userId },
                    os: os,
                    osVersion: osVersion,
                    browser: (0, typeorm_2.Not)(browser),
                },
            ],
            order: {
                date: {
                    direction: "DESC",
                },
            },
            relations: {
                userActivityType: true,
            },
        });
        if (lastActivitySameDevice[0] &&
            lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString() &&
            !lastActivityOtherDevice[0] &&
            lastActivityOtherDevice[0] === undefined) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        else if (lastActivitySameDevice[0] &&
            lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString() &&
            lastActivityOtherDevice[0] &&
            lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString()) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, {
                where: {
                    userActivityTypeId: activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString(),
                },
            });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = lastActivityOtherDevice[0].os;
            userActivityLog.osVersion = lastActivityOtherDevice[0].osVersion;
            userActivityLog.browser = lastActivityOtherDevice[0].browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
            await this.usersService.setCurrentRefreshToken(null, Number(userId));
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        else if (lastActivitySameDevice[0] &&
            lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString()) {
            userActivityLog = lastActivitySameDevice[0];
            userActivityLog.date = date;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        else if ((!lastActivitySameDevice[0] ||
            !lastActivitySameDevice[0] === undefined) &&
            lastActivityOtherDevice[0] &&
            (lastActivityOtherDevice[0].os !== os ||
                lastActivityOtherDevice[0].osVersion !== osVersion ||
                lastActivityOtherDevice[0].browser !== browser) &&
            lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString()) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        else if ((!lastActivitySameDevice[0] ||
            !lastActivitySameDevice[0] === undefined) &&
            lastActivityOtherDevice[0] &&
            (lastActivityOtherDevice[0].os !== os ||
                lastActivityOtherDevice[0].osVersion !== osVersion ||
                lastActivityOtherDevice[0].browser !== browser) &&
            lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString()) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, {
                where: {
                    userActivityTypeId: activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString(),
                },
            });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = lastActivityOtherDevice[0].os;
            userActivityLog.osVersion = lastActivityOtherDevice[0].osVersion;
            userActivityLog.browser = lastActivityOtherDevice[0].browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
            await this.usersService.setCurrentRefreshToken(null, Number(userId));
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        else {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
        }
        return userActivityLog;
    }
    async userLogout(entityManager, userId, date, os, osVersion, browser) {
        const userActivityTypeId = activity_type_enum_1.ActivityTypeEnum.USER_LOGOUT.toString();
        let userActivityLog = new UserActivityLog_1.UserActivityLog();
        const lastActivitySameDevice = await entityManager.find(UserActivityLog_1.UserActivityLog, {
            where: {
                user: { userId },
                os,
                osVersion,
                browser,
            },
            order: {
                date: {
                    direction: "DESC",
                },
            },
            relations: {
                userActivityType: true,
            },
        });
        const lastActivityOtherDevice = await entityManager.find(UserActivityLog_1.UserActivityLog, {
            where: [
                {
                    user: { userId },
                },
                {
                    os: (0, typeorm_2.Not)(os),
                },
                {
                    osVersion: (0, typeorm_2.Not)(osVersion),
                },
                {
                    browser: (0, typeorm_2.Not)(browser),
                },
            ],
            order: {
                date: {
                    direction: "DESC",
                },
            },
            relations: {
                userActivityType: true,
            },
        });
        if (lastActivitySameDevice[0] &&
            lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString()) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
            await this.usersService.setCurrentRefreshToken(null, Number(userId));
        }
        else if ((!lastActivitySameDevice[0] ||
            !lastActivitySameDevice[0] === undefined) &&
            lastActivityOtherDevice[0] &&
            (lastActivityOtherDevice[0].os !== os ||
                lastActivityOtherDevice[0].osVersion !== osVersion ||
                lastActivityOtherDevice[0].browser !== browser) &&
            lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
                activity_type_enum_1.ActivityTypeEnum.USER_LOGIN.toString()) {
            userActivityLog = new UserActivityLog_1.UserActivityLog();
            userActivityLog.userActivityType = await entityManager.findOne(UserActivityType_1.UserActivityType, { where: { userActivityTypeId: userActivityTypeId } });
            userActivityLog.user = await entityManager.findOne(Users_1.Users, {
                where: { userId: userId },
            });
            userActivityLog.date = date;
            userActivityLog.os = os;
            userActivityLog.osVersion = osVersion;
            userActivityLog.browser = browser;
            userActivityLog = await entityManager.save(UserActivityLog_1.UserActivityLog, userActivityLog);
            await this.usersService.setCurrentRefreshToken(null, Number(userId));
        }
        return userActivityLog;
    }
};
UserActivityLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(UserActivityLog_1.UserActivityLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        users_service_1.UsersService])
], UserActivityLogService);
exports.UserActivityLogService = UserActivityLogService;
//# sourceMappingURL=user-activity-log.service.js.map