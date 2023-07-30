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
exports.JournalEntryService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const moment = require("moment");
const rxjs_1 = require("rxjs");
const entity_status_enum_1 = require("../common/enums/entity-status.enum");
const mood_entity_enum_1 = require("../common/enums/mood-entity.enum");
const utils_1 = require("../common/utils/utils");
const EntityStatus_1 = require("../shared/entities/EntityStatus");
const HeartRateLog_1 = require("../shared/entities/HeartRateLog");
const JournalEntry_1 = require("../shared/entities/JournalEntry");
const JournalEntryActivity_1 = require("../shared/entities/JournalEntryActivity");
const MoodEntity_1 = require("../shared/entities/MoodEntity");
const Users_1 = require("../shared/entities/Users");
const typeorm_2 = require("typeorm");
const heart_rate_log_service_1 = require("./heart-rate-log.service");
const users_service_1 = require("./users.service");
let JournalEntryService = class JournalEntryService {
    constructor(journalEntryRepo, journalEntryActivityRepo, heartRateLogService, usersService) {
        this.journalEntryRepo = journalEntryRepo;
        this.journalEntryActivityRepo = journalEntryActivityRepo;
        this.heartRateLogService = heartRateLogService;
        this.usersService = usersService;
    }
    async findByDate(userId = "0", dateFrom, dateTo) {
        try {
            dateFrom = new Date(dateFrom.setHours(0, 0, 0, 0));
            dateTo = new Date(new Date(dateTo.setDate(dateTo.getDate() + 1)).setHours(0, 0, 0, 0));
            const result = await this.journalEntryRepo.manager
                .createQueryBuilder("JournalEntry", "je")
                .leftJoin("je.user", "u")
                .leftJoin("je.entityStatus", "es")
                .leftJoinAndSelect("je.heartRateLog", "hl")
                .leftJoinAndSelect("je.moodEntity", "me")
                .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId AND " +
                "es.entityStatusId = :entityStatusId")
                .orderBy("je.timestamp", "DESC")
                .setParameters({
                dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(dateTo).format('YYYY-MM-DD'),
                userId,
                entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString()
            })
                .getMany();
            return result;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getDateSummary(userId = "0", date) {
        try {
            const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
            const dateFrom = new Date(new Date(localDate).setHours(0, 0, 0, 0));
            const dateTo = new Date(new Date(new Date(localDate).setDate(new Date(localDate).getDate() + 1)).setHours(0, 0, 0, 0));
            const query = await this.journalEntryRepo.manager
                .createQueryBuilder("JournalEntry", "je")
                .leftJoinAndSelect("je.user", "u")
                .leftJoinAndSelect("je.entityStatus", "es")
                .leftJoinAndSelect("je.heartRateLog", "hl")
                .leftJoinAndSelect("je.moodEntity", "me")
                .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId AND " +
                "es.entityStatusId = :entityStatusId AND " +
                "me.moodEntityId = :moodEntityId");
            const list = await (0, rxjs_1.forkJoin)([
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.AMAZING.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.AMAZING.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_HAPPY.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_HAPPY.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_SAD.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_SAD.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.ANGRY.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.ANGRY.toString(),
                    }).getCount()
                })
            ]).toPromise();
            list.sort(function (a, b) { return Number(a.moodEntityId) - Number(b.moodEntityId); });
            const sum = list.map(x => x.count).reduce((accc, n) => {
                return accc + n;
            }, 0);
            const max = list.reduce(function (prev, current) {
                return (prev.count > current.count) ? prev : current;
            });
            const mood = await this.journalEntryRepo.manager.findOneBy(MoodEntity_1.MoodEntity, {
                moodEntityId: max.count > 0 ? max.moodEntityId : mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString()
            });
            const totalMood = list.filter(x => x.moodEntityId === mood.moodEntityId).map(x => x.count).reduce((accc, n) => {
                return accc + n;
            }, 0);
            const lastEntry = await this.journalEntryRepo.manager
                .createQueryBuilder("JournalEntry", "je")
                .leftJoinAndSelect("je.user", "u")
                .leftJoin("je.entityStatus", "es")
                .leftJoinAndSelect("je.heartRateLog", "hl")
                .leftJoin("je.moodEntity", "me")
                .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId AND " +
                "es.entityStatusId = :entityStatusId AND " +
                "me.moodEntityId = :moodEntityId ")
                .setParameters({
                dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                dateTo: moment(dateTo).format('YYYY-MM-DD'),
                userId,
                entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                moodEntityId: mood.moodEntityId
            })
                .orderBy("je.timestamp", "DESC")
                .getOne();
            const heartRateStatus = lastEntry && lastEntry.user && lastEntry.heartRateLog ? await this.heartRateLogService.getHeartRateStatus(lastEntry.user.userId, Number(lastEntry.heartRateLog.value)) : null;
            return Object.assign(Object.assign(Object.assign(Object.assign({}, mood), { timestamp: lastEntry ? lastEntry.timestamp : null, heartRate: lastEntry ? lastEntry.heartRateLog.value : null, lastHeartRateLogId: lastEntry ? lastEntry.heartRateLog.heartRateLogId : null }), heartRateStatus), { moodPercent: totalMood >= sum ? 100 : (sum > 0 ? (0, utils_1.round)((max.count / sum)) : 100) });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getWeeklySummary(userId = "0", date) {
        try {
            const d = (0, rxjs_1.of)([]);
            const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
            const first = localDate.getDate() - localDate.getDay();
            const last = first + 6;
            const firstday = new Date(localDate.setDate(first));
            const lastday = new Date(new Date(localDate.setDate(last)).setMonth(firstday.getMonth() + 1));
            const dateFrom = new Date(new Date(firstday).setHours(0, 0, 0, 0));
            const dateTo = new Date(new Date(lastday.setDate(lastday.getDate() + 1)).setHours(0, 0, 0, 0));
            const query = await this.journalEntryRepo.manager
                .createQueryBuilder("JournalEntry", "je")
                .leftJoinAndSelect("je.user", "u")
                .leftJoinAndSelect("je.entityStatus", "es")
                .leftJoinAndSelect("je.heartRateLog", "hl")
                .leftJoinAndSelect("je.moodEntity", "me")
                .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId AND " +
                "es.entityStatusId = :entityStatusId AND " +
                "me.moodEntityId = :moodEntityId");
            let result = await (0, rxjs_1.forkJoin)([
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.AMAZING.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.AMAZING.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_HAPPY.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_HAPPY.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_SAD.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.FEELING_SAD.toString(),
                    }).getCount()
                }),
                (0, rxjs_1.of)({
                    moodEntityId: mood_entity_enum_1.MoodEntityEnum.ANGRY.toString(),
                    count: await query
                        .setParameters({
                        dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                        dateTo: moment(dateTo).format('YYYY-MM-DD'),
                        userId,
                        entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: mood_entity_enum_1.MoodEntityEnum.ANGRY.toString(),
                    }).getCount()
                })
            ]).toPromise();
            result.sort(function (a, b) { return Number(a.moodEntityId) - Number(b.moodEntityId); });
            const sum = result.map(x => x.count).reduce((accc, n) => {
                return accc + n;
            }, 0);
            const max = result.reduce(function (prev, current) {
                return (prev.count > current.count) ? prev : current;
            });
            const mood = await this.journalEntryRepo.manager.findOneBy(MoodEntity_1.MoodEntity, {
                moodEntityId: max.count > 0 ? max.moodEntityId : mood_entity_enum_1.MoodEntityEnum.I_AM_GOOD.toString()
            });
            const totalMood = result.filter(x => x.moodEntityId === mood.moodEntityId).map(x => x.count).reduce((accc, n) => {
                return accc + n;
            }, 0);
            const formattedResult = result.map(x => {
                const moodPercent = x.count >= sum ? 100 : (sum > 0 ? (0, utils_1.round)((x.count / sum)) : 100);
                return Object.assign(Object.assign({}, x), { moodPercent });
            });
            return Object.assign(Object.assign({ result: formattedResult }, mood), { moodPercent: totalMood >= sum ? 100 : (sum > 0 ? (0, utils_1.round)((max.count / sum)) : 100) });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async getWeekly(userId = "0", date) {
        try {
            const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
            const daysOfAWeek = Array(7).fill(localDate).map((el, idx) => moment(new Date(el.setDate(el.getDate() - el.getDay() + idx))).format("YYYY-MM-DD"));
            const queryList = daysOfAWeek.map(async (x) => {
                const localDate = new Date(moment(x).format("YYYY-MM-DD HH:mm:ss"));
                const dateFrom = new Date(new Date(localDate).setHours(0, 0, 0, 0));
                const dateTo = new Date(new Date(localDate.setDate(localDate.getDate() + 1)).setHours(0, 0, 0, 0));
                return await this.journalEntryRepo.manager
                    .createQueryBuilder("JournalEntry", "je")
                    .leftJoinAndSelect("je.user", "u")
                    .leftJoinAndSelect("je.entityStatus", "es")
                    .leftJoinAndSelect("je.moodEntity", "me")
                    .select("je.timestamp", "timestamp")
                    .addSelect("me.moodEntityId", "moodEntityId")
                    .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                    "u.userId = :userId AND " +
                    "es.entityStatusId = :entityStatusId")
                    .setParameters({
                    dateFrom: moment(dateFrom).format('YYYY-MM-DD'),
                    dateTo: moment(dateTo).format('YYYY-MM-DD'),
                    userId,
                    entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString()
                })
                    .orderBy("je.journalEntryId", "DESC")
                    .getRawOne();
            });
            let result = await (0, rxjs_1.forkJoin)(...queryList).toPromise();
            return result.map((x = { moodEntityId: null }, i) => {
                let { timestamp, moodEntityId } = x;
                if (!timestamp || timestamp === "") {
                    timestamp = daysOfAWeek[i];
                }
                x.timestamp = moment(timestamp).format("YYYY-MM-DD");
                return x;
            });
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async findOne(options) {
        try {
            const journalEntry = await this.journalEntryRepo.findOne({
                where: options,
                relations: {
                    entityStatus: true,
                    moodEntity: true
                },
            });
            return journalEntry;
        }
        catch (e) {
            console.log(e);
            throw e;
        }
    }
    async findById(journalEntryId) {
        try {
            const journalEntry = await this.findOne({
                journalEntryId,
                entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() },
            });
            if (!journalEntry) {
                throw new common_1.HttpException("Journal Entry not found", common_1.HttpStatus.NOT_FOUND);
            }
            return journalEntry;
        }
        catch (e) {
            throw e;
        }
    }
    async add(userId, createJournalEntryDto) {
        return await this.journalEntryRepo.manager.transaction(async (entityManager) => {
            let journalEntry = new JournalEntry_1.JournalEntry();
            journalEntry.notes = createJournalEntryDto.notes;
            journalEntry.moodEntity = await entityManager.findOneBy(MoodEntity_1.MoodEntity, {
                moodEntityId: createJournalEntryDto.moodEntityId,
            });
            journalEntry.entityStatus = await entityManager.findOneBy(EntityStatus_1.EntityStatus, {
                entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString(),
            });
            journalEntry.user = await entityManager.findOneBy(Users_1.Users, {
                userId
            });
            journalEntry.heartRateLog = await entityManager.findOneBy(HeartRateLog_1.HeartRateLog, {
                heartRateLogId: createJournalEntryDto.heartRateLogId,
                user: { userId }
            });
            if (!journalEntry.heartRateLog) {
                throw new common_1.HttpException("Heart rate not found", common_1.HttpStatus.NOT_FOUND);
            }
            journalEntry = await entityManager.save(JournalEntry_1.JournalEntry, journalEntry);
            if (!journalEntry || journalEntry === undefined) {
                throw new common_1.HttpException("Error saving journal entry", common_1.HttpStatus.NOT_FOUND);
            }
            const user = await this.usersService.updateJournalReminderDate(userId);
            if (!user || user === undefined) {
                throw new common_1.HttpException("Error updating user journal reminder date", common_1.HttpStatus.NOT_FOUND);
            }
            return await entityManager.findOne(JournalEntry_1.JournalEntry, {
                where: {
                    journalEntryId: journalEntry.journalEntryId,
                    entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() },
                },
                relations: {
                    moodEntity: true,
                }
            });
        });
    }
    async update(dto) {
        const { journalEntryId } = dto;
        return await this.journalEntryRepo.manager.transaction(async (entityManager) => {
            let journalEntry = await this.findOne({
                journalEntryId,
                entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() }
            });
            journalEntry.notes = dto.notes;
            journalEntry.moodEntity = await entityManager.findOneBy(MoodEntity_1.MoodEntity, {
                moodEntityId: dto.moodEntityId,
            });
            journalEntry.heartRateLog = await entityManager.findOneBy(HeartRateLog_1.HeartRateLog, {
                heartRateLogId: dto.heartRateLogId,
                user: { userId: journalEntry.user.userId }
            });
            if (!journalEntry.heartRateLog) {
                throw new common_1.HttpException("Heart rate not found", common_1.HttpStatus.NOT_FOUND);
            }
            journalEntry = await entityManager.save(JournalEntry_1.JournalEntry, journalEntry);
            return await entityManager.findOne(JournalEntry_1.JournalEntry, {
                where: {
                    journalEntryId: journalEntry.journalEntryId,
                    entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() },
                },
                relations: {
                    moodEntity: true,
                }
            });
        });
    }
    async delete(journalEntryId) {
        try {
            const journalEntry = await this.findOne({
                journalEntryId,
                entityStatus: { entityStatusId: entity_status_enum_1.EntityStatusEnum.ACTIVE.toString() },
            });
            if (!journalEntry) {
                throw new common_1.HttpException("Journal Entry not found", common_1.HttpStatus.NOT_FOUND);
            }
            journalEntry.entityStatus.entityStatusId = entity_status_enum_1.EntityStatusEnum.DELETED.toString();
            return await this.journalEntryRepo.save(journalEntry);
        }
        catch (e) {
            throw e;
        }
    }
};
JournalEntryService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(JournalEntry_1.JournalEntry)),
    __param(1, (0, typeorm_1.InjectRepository)(JournalEntryActivity_1.JournalEntryActivity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        heart_rate_log_service_1.HeartRateLogService,
        users_service_1.UsersService])
], JournalEntryService);
exports.JournalEntryService = JournalEntryService;
//# sourceMappingURL=journal-entry.service.js.map