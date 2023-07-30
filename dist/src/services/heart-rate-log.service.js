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
exports.HeartRateLogService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const entity_status_enum_1 = require("../common/enums/entity-status.enum");
const heart_rate_status_enum_1 = require("../common/enums/heart-rate-status.enum");
const utils_1 = require("../common/utils/utils");
const HeartRateLog_1 = require("../shared/entities/HeartRateLog");
const Users_1 = require("../shared/entities/Users");
const typeorm_2 = require("typeorm");
let HeartRateLogService = class HeartRateLogService {
    constructor(heartRateLogRepo) {
        this.heartRateLogRepo = heartRateLogRepo;
    }
    async getHeartRateStatus(userId, value) {
        try {
            const currentUser = await this.heartRateLogRepo.manager
                .findOneBy(Users_1.Users, { userId, entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() } });
            if (!currentUser) {
                throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
            }
            const age = await (0, utils_1.getAge)(new Date(moment(currentUser.birthDate).format("YYYY-MM-DD HH:mm:ss")));
            const percent = await (0, utils_1.getHearRateTargetPercentage)(age, value);
            let score = 0;
            if (percent >= 70 && percent <= 100) {
                score = heart_rate_status_enum_1.HeartRateStatusEnum.HEALTHY;
            }
            else if (percent >= 40 && percent < 70) {
                score = heart_rate_status_enum_1.HeartRateStatusEnum.REGULAR;
            }
            else if (percent < 40) {
                score = heart_rate_status_enum_1.HeartRateStatusEnum.IRREGULAR;
            }
            else if (percent > 100) {
                score = heart_rate_status_enum_1.HeartRateStatusEnum.IRREGULAR;
            }
            return {
                heartRatePercentage: (0, utils_1.round)(percent),
                heartRateScore: Number(score),
                heartRateStatus: heart_rate_status_enum_1.HeartRateStatusEnum[score]
            };
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async findByDate(userId = "0", dateFrom, dateTo) {
        try {
            dateFrom = new Date(dateFrom.setHours(0, 0, 0, 0));
            dateTo = new Date(new Date(dateTo.setDate(dateTo.getDate() + 1)).setHours(0, 0, 0, 0));
            const result = await this.heartRateLogRepo.manager
                .createQueryBuilder("HeartRateLog", "hrl")
                .leftJoin("hrl.user", "u")
                .where("((hrl.timestamp  AT TIME ZONE 'Asia/Manila') between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId")
                .orderBy("hrl.timestamp", "DESC")
                .setParameters({
                dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(dateTo).format('YYYY-MM-DD'),
                userId
            })
                .getMany();
            return result;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async findOne(options) {
        try {
            const heartRateLog = await this.heartRateLogRepo.findOne({
                where: options,
            });
            return heartRateLog;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async findById(heartRateLogId) {
        try {
            const heartRateLog = await this.findOne({
                heartRateLogId,
                entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() },
            });
            if (!heartRateLog) {
                throw new common_1.HttpException("Heart RateLog not found", common_1.HttpStatus.NOT_FOUND);
            }
            return heartRateLog;
        }
        catch (e) {
            throw e;
        }
    }
    async add(userId, createHeartRateLogDto) {
        return await this.heartRateLogRepo.manager.transaction(async (entityManager) => {
            let heartRateLog = new HeartRateLog_1.HeartRateLog();
            const timestamp = await entityManager.query("select (now() AT TIME ZONE 'Asia/Manila'::text) as timestamp").then(res => {
                return res[0]['timestamp'];
            });
            heartRateLog.timestamp = timestamp;
            heartRateLog.value = createHeartRateLogDto.value;
            heartRateLog.user = await entityManager.findOneBy(Users_1.Users, {
                userId
            });
            heartRateLog = await entityManager.save(HeartRateLog_1.HeartRateLog, heartRateLog);
            delete heartRateLog.user.password;
            delete heartRateLog.user.currentHashedRefreshToken;
            delete heartRateLog.user.firebaseToken;
            return heartRateLog;
        });
    }
};
HeartRateLogService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(HeartRateLog_1.HeartRateLog)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], HeartRateLogService);
exports.HeartRateLogService = HeartRateLogService;
//# sourceMappingURL=heart-rate-log.service.js.map