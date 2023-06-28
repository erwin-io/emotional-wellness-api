/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { async, forkJoin, of } from 'rxjs';
import { DateConstant } from 'src/common/constant/date.constant';
import { EntityStatusEnum } from 'src/common/enums/entity-status.enum';
import { MoodEntityEnum } from 'src/common/enums/mood-entity.enum';
import { round } from 'src/common/utils/utils';
import { CreateJournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.create.dto';
import { JournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.update.dto';
import { ActivityType } from 'src/shared/entities/ActivityType';
import { EntityStatus } from 'src/shared/entities/EntityStatus';
import { HeartRateLog } from 'src/shared/entities/HeartRateLog';
import { JournalEntry } from 'src/shared/entities/JournalEntry';
import { JournalEntryActivity } from 'src/shared/entities/JournalEntryActivity';
import { MoodEntity } from 'src/shared/entities/MoodEntity';
import { Users } from 'src/shared/entities/Users';
import { Repository } from 'typeorm';
import { HeartRateLogService } from './heart-rate-log.service';

@Injectable()
export class JournalEntryService {
    constructor(
      @InjectRepository(JournalEntry)
      private readonly journalEntryRepo: Repository<JournalEntry>,
      @InjectRepository(JournalEntryActivity)
      private readonly journalEntryActivityRepo: Repository<JournalEntryActivity>,
      private heartRateLogService: HeartRateLogService,
    ) {}
  
    async findByDate(userId: string = "0", dateFrom: Date, dateTo: Date) {
      try {
        dateFrom = new Date(dateFrom.setHours(0,0,0,0));
        dateTo = new Date(new Date(dateTo.setDate(dateTo.getDate() + 1)).setHours(0,0,0,0));
        const result: JournalEntry[] = await this.journalEntryRepo.manager
        .createQueryBuilder("JournalEntry", "je")
        .leftJoin("je.user", "u")
        .leftJoin("je.entityStatus", "es")
        .leftJoinAndSelect("je.heartRateLog", "hl")
        .leftJoinAndSelect("je.moodEntity", "me")
        // .leftJoinAndSelect("je.journalEntryActivities", "jea")
        .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
            "u.userId = :userId AND " +
            "es.entityStatusId = :entityStatusId"
        )
        .orderBy("je.timestamp", "DESC")
        .setParameters({
            dateFrom: moment.utc(dateFrom).format(),
            dateTo: moment.utc(dateTo).format(),
            userId,
            entityStatusId: EntityStatusEnum.ACTIVE.toString()
        })
        .getMany() as any;
        return result.map(x=> {
          x.timestamp = new Date(x.timestamp.toLocaleString('utc', {timeZone: 'utc'}))
          return x;
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
    
  
    async getDateSummary(userId: string = "0", date: Date) {
      try {
        const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));

        const dateFrom = new Date(new Date(localDate).setHours(0,0,0,0));
        const dateTo = new Date(new Date(new Date(localDate).setDate(new Date(localDate).getDate() + 1)).setHours(0,0,0,0));
        const query = await this.journalEntryRepo.manager
        .createQueryBuilder("JournalEntry", "je")
        .leftJoinAndSelect("je.user", "u")
        .leftJoinAndSelect("je.entityStatus", "es")
        .leftJoinAndSelect("je.heartRateLog", "hl")
        .leftJoinAndSelect("je.moodEntity", "me")
        // .leftJoinAndSelect("je.journalEntryActivities", "jea")
        .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
            "u.userId = :userId AND " +
            "es.entityStatusId = :entityStatusId AND " +
            "me.moodEntityId = :moodEntityId"
        );
        const list = await forkJoin(
            [
                of({
                    moodEntityId: MoodEntityEnum.AMAZING.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.AMAZING.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.FEELING_HAPPY.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.FEELING_HAPPY.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.I_AM_GOOD.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.I_AM_GOOD.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.FEELING_SAD.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.FEELING_SAD.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.ANGRY.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.ANGRY.toString(),
                    }).getCount()
                })
            ]
        ).toPromise();
        list.sort(function(a, b){return Number(a.moodEntityId) - Number(b.moodEntityId)});
        
        const sum = list.map(x=>x.count).reduce((accc, n) => {
            return accc + n;
        } , 0);
        const max = list.reduce(function(prev, current) {
            return (prev.count > current.count) ? prev : current
        }) //
        const mood = await this.journalEntryRepo.manager.findOneBy(MoodEntity, {
            moodEntityId: max.count > 0 ? max.moodEntityId : MoodEntityEnum.I_AM_GOOD.toString()
        });

        const totalMood = list.filter(x=>x.moodEntityId === mood.moodEntityId).map(x=>x.count).reduce((accc, n) => {
            return accc + n;
        } , 0);
        
        const lastEntry: JournalEntry = await this.journalEntryRepo.manager
        .createQueryBuilder("JournalEntry", "je")
        .leftJoinAndSelect("je.user", "u")
        .leftJoin("je.entityStatus", "es")
        .leftJoinAndSelect("je.heartRateLog", "hl")
        .leftJoin("je.moodEntity", "me")
        .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
            "u.userId = :userId AND " +
            "es.entityStatusId = :entityStatusId AND " +
            "me.moodEntityId = :moodEntityId "
        )
        .setParameters({
            dateFrom: moment.utc(dateFrom).format(),
            dateTo: moment.utc(dateTo).format(),
            userId,
            entityStatusId: EntityStatusEnum.ACTIVE.toString(),
            moodEntityId: mood.moodEntityId
        })
        .orderBy("je.timestamp", "DESC")
        .getOne() as any;
        
        const heartRateStatus = lastEntry && lastEntry.user && lastEntry.heartRateLog ? await this.heartRateLogService.getHeartRateStatus(lastEntry.user.userId, Number(lastEntry.heartRateLog.value)) : null;
        return {
            ...mood,
            timestamp: lastEntry ? new Date(lastEntry.timestamp.toLocaleString('utc', {timeZone: 'utc'})) : null,
            heartRate: lastEntry ? lastEntry.heartRateLog.value : null,
            lastHeartRateLogId: lastEntry ? lastEntry.heartRateLog.heartRateLogId : null,
            ...heartRateStatus,
            moodPercent: totalMood >= sum ? 100 : (sum > 0 ? round((max.count /sum)) : 100)
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
    async getWeeklySummary(userId: string = "0", date: Date) {
      try {
        const d = of([]);
        const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));

        const first = localDate.getDate() - localDate.getDay(); // First day is the day of the month - the day of the week
        const last = first + 6; // last day is the first day + 6

        const firstday = new Date(localDate.setDate(first));
        const lastday = new Date(new Date(localDate.setDate(last)).setMonth(firstday.getMonth() + 1));


        const dateFrom = new Date(new Date(firstday).setHours(0,0,0,0));
        const dateTo = new Date(new Date(lastday.setDate(lastday.getDate() + 1)).setHours(0,0,0,0));
        const query = await this.journalEntryRepo.manager
        .createQueryBuilder("JournalEntry", "je")
        .leftJoinAndSelect("je.user", "u")
        .leftJoinAndSelect("je.entityStatus", "es")
        .leftJoinAndSelect("je.heartRateLog", "hl")
        .leftJoinAndSelect("je.moodEntity", "me")
        // .leftJoinAndSelect("je.journalEntryActivities", "jea")
        .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
            "u.userId = :userId AND " +
            "es.entityStatusId = :entityStatusId AND " +
            "me.moodEntityId = :moodEntityId"
        );
        let result = await forkJoin(
            [
                of({
                    moodEntityId: MoodEntityEnum.AMAZING.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.AMAZING.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.FEELING_HAPPY.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.FEELING_HAPPY.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.I_AM_GOOD.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.I_AM_GOOD.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.FEELING_SAD.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.FEELING_SAD.toString(),
                    }).getCount()
                }),
                of({
                    moodEntityId: MoodEntityEnum.ANGRY.toString(),
                    count: await query
                    .setParameters({
                        dateFrom: moment.utc(dateFrom).format(),
                        dateTo: moment.utc(dateTo).format(),
                        userId,
                        entityStatusId: EntityStatusEnum.ACTIVE.toString(),
                        moodEntityId: MoodEntityEnum.ANGRY.toString(),
                    }).getCount()
                })]
        ).toPromise();
        result.sort(function(a, b){return Number(a.moodEntityId) - Number(b.moodEntityId)});
        const sum = result.map(x=>x.count).reduce((accc, n) => {
            return accc + n;
        } , 0);
        const max = result.reduce(function(prev, current) {
            return (prev.count > current.count) ? prev : current
        }) //
        const mood = await this.journalEntryRepo.manager.findOneBy(MoodEntity, {
            moodEntityId: max.count > 0 ? max.moodEntityId : MoodEntityEnum.I_AM_GOOD.toString()
        })

        const totalMood = result.filter(x=>x.moodEntityId === mood.moodEntityId).map(x=>x.count).reduce((accc, n) => {
            return accc + n;
        } , 0);
        const formattedResult = result.map(x=> {
          const moodPercent = x.count >= sum ? 100 : (sum > 0 ? round((x.count / sum)) : 100)
          return {
            ...x,
            moodPercent
          };
        });
        return {
          result: formattedResult,
          ...mood, 
          moodPercent: totalMood >= sum ? 100 : (sum > 0 ? round((max.count / sum)) : 100)
        };
      } catch (e) {
        console.log(e);
        throw e;
      }
    }

    async getWeekly(userId: string = "0", date: Date) {
      try {

        const localDate = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
        const daysOfAWeek = Array(7).fill(localDate).map((el, idx) =>
          moment(new Date(el.setDate(el.getDate() - el.getDay() + idx))).format("YYYY-MM-DD"))
        const queryList = daysOfAWeek.map(async x=> {
            const localDate = new Date(moment(x).format("YYYY-MM-DD HH:mm:ss"));
            
            const dateFrom = new Date(new Date(localDate).setHours(0,0,0,0));
            const dateTo = new Date(new Date(localDate.setDate(localDate.getDate() + 1)).setHours(0,0,0,0));
            return await this.journalEntryRepo.manager
            .createQueryBuilder("JournalEntry", "je")
            .leftJoinAndSelect("je.user", "u")
            .leftJoinAndSelect("je.entityStatus", "es")
            .leftJoinAndSelect("je.moodEntity", "me")
            // .leftJoinAndSelect("je.journalEntryActivities", "jea")
            .select("(je.timestamp AT TIME ZONE 'utc'::text)", "timestamp")
            .addSelect("me.moodEntityId", "moodEntityId")
            .where("(je.timestamp between :dateFrom AND :dateTo) AND " +
                "u.userId = :userId AND " +
                "es.entityStatusId = :entityStatusId"
            )
            .setParameters({
                dateFrom: moment.utc(dateFrom).format(),
                dateTo: moment.utc(dateTo).format(),
                userId,
                entityStatusId: EntityStatusEnum.ACTIVE.toString()
            })
            .orderBy("je.journalEntryId", "DESC")
            .getRawOne();
        })

        
        let result = await forkJoin(
            ...queryList
        ).toPromise();
        return result.map((x:any = {moodEntityId: null } as any, i)=> {
            let { timestamp, moodEntityId } = x;
            if(!timestamp || timestamp === "") {
                timestamp = new Date(new Date(daysOfAWeek[i]).toLocaleString('utc', { timeZone: 'utc'}))
            }
            x.timestamp = moment(timestamp).format("YYYY-MM-DD");
            return x;
        });
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
    async findOne(options?: any) {
      try {
        const journalEntry = await this.journalEntryRepo.findOne({
          where: options,
          relations: {
              entityStatus: true,
              // journalEntryActivities: {
              //   activityType: true
              // },
              moodEntity: true
          },
        });
        return journalEntry;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
    async findById(journalEntryId: string) {
      try {
        const journalEntry = await this.findOne({
          journalEntryId,
          entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() },
        });
        if (!journalEntry) {
          throw new HttpException("Journal Entry not found", HttpStatus.NOT_FOUND);
        }
        journalEntry.timestamp = new Date(journalEntry.timestamp.toLocaleString('utc', { timeZone: 'utc'}))
        return journalEntry;
      } catch (e) {
        throw e;
      }
    }
  
    async add(userId, createJournalEntryDto: CreateJournalEntryDto) {
      return await this.journalEntryRepo.manager.transaction(
        async (entityManager) => {
            let journalEntry = new JournalEntry();
            journalEntry.notes = createJournalEntryDto.notes;
            const { date, locale, timeZone } = createJournalEntryDto.timestamp;
            // journalEntry.timestamp = new Date(date.toLocaleString(locale, { timeZone }));
            journalEntry.timestamp = await entityManager.query("select (now() AT TIME ZONE '" + timeZone + "'::text) as timestamp").then(res=> {
              return res[0]['timestamp'];
            });
            journalEntry.moodEntity = await entityManager.findOneBy(MoodEntity, {
                moodEntityId: createJournalEntryDto.moodEntityId,
            });
            journalEntry.entityStatus = await entityManager.findOneBy(EntityStatus, {
                entityStatusId: EntityStatusEnum.ACTIVE.toString(),
            });
            journalEntry.user = await entityManager.findOneBy(Users,{
                userId
            })
            journalEntry.heartRateLog = await entityManager.findOneBy(HeartRateLog,{
                heartRateLogId: createJournalEntryDto.heartRateLogId,
                user: { userId }
            });
            if(!journalEntry.heartRateLog) {
              throw new HttpException("Heart rate not found", HttpStatus.NOT_FOUND);
            }
            journalEntry = await entityManager.save(JournalEntry, journalEntry);
            // if(createJournalEntryDto.activityTypeIds && createJournalEntryDto.activityTypeIds.split(",").length > 0) {
            //     createJournalEntryDto.activityTypeIds.split(",").forEach(async x=> {
            //         const activityType = await entityManager.findOneBy(ActivityType, {
            //             activityTypeId: x
            //         });
            //         if(activityType) {
            //             const journalEntryActivity = new JournalEntryActivity()
            //             journalEntryActivity.activityType = activityType;
            //             journalEntryActivity.journalEntry = journalEntry;
            //             await entityManager.save(JournalEntryActivity, journalEntryActivity);
            //         }
            //     })

            // }
            return await entityManager.findOne(JournalEntry, {
                where: {
                    journalEntryId: journalEntry.journalEntryId,
                    entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() },
                },
                relations: {
                    moodEntity: true,
                    // journalEntryActivities: {
                    //     activityType: true
                    // },
                }
            });
        }
      );
    }
  
    async update(dto: JournalEntryDto) {
      const { journalEntryId } = dto;
      return await this.journalEntryRepo.manager.transaction(
        async (entityManager) => {
            let journalEntry = await this.findOne({
                journalEntryId,
                entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() }
            });
            journalEntry.notes = dto.notes;
            // journalEntry.timestamp = new Date(moment(new Date()).format("YYYY-MM-DD HH:mm:ss"));
            // journalEntry.timestamp = new Date(moment.utc(new Date()).format());
            const { date, locale, timeZone } = dto.timestamp;
            journalEntry.timestamp = await entityManager.query("select (now() AT TIME ZONE '" + timeZone + "'::text) as timestamp").then(res=> {
              return res[0]['timestamp'];
            });
            journalEntry.moodEntity = await entityManager.findOneBy(MoodEntity, {
                moodEntityId: dto.moodEntityId,
            });
            journalEntry.heartRateLog = await entityManager.findOneBy(HeartRateLog,{
                heartRateLogId: dto.heartRateLogId,
                user: { userId: journalEntry.user.userId }
            });
            if(!journalEntry.heartRateLog) {
              throw new HttpException("Heart rate not found", HttpStatus.NOT_FOUND);
            }
            journalEntry = await entityManager.save(JournalEntry, journalEntry);
            // const activityToDelete = journalEntry.journalEntryActivities.map(x=> x.journalEntryActivityId);
            // if(activityToDelete.length > 0) 
            //     await this.journalEntryActivityRepo.delete(activityToDelete);

            // if(dto.activityTypeIds && dto.activityTypeIds.split(",").length > 0) {
            //     dto.activityTypeIds.split(",").forEach(async x=> {
            //         const activityType = await entityManager.findOneBy(ActivityType, {
            //             activityTypeId: x
            //         });
            //         if(activityType) {
            //             const journalEntryActivity = new JournalEntryActivity()
            //             journalEntryActivity.activityType = activityType;
            //             journalEntryActivity.journalEntry = journalEntry;
            //             await entityManager.save(JournalEntryActivity, journalEntryActivity)
            //         }
            //     })
            // }
            return await entityManager.findOne(JournalEntry, {
                where: {
                    journalEntryId: journalEntry.journalEntryId,
                    entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() },
                },
                relations: {
                    moodEntity: true,
                    // journalEntryActivities: {
                    //     activityType: true
                    // },
                }
            });
        }
      );
    }
  
    async delete(journalEntryId: string) {
      try {
        const journalEntry = await this.findOne({
          journalEntryId,
          entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() },
        });
        if (!journalEntry) {
          throw new HttpException("Journal Entry not found", HttpStatus.NOT_FOUND);
        }
        // const activityToDelete = journalEntry.journalEntryActivities.map(x=> x.journalEntryActivityId);
        // if(activityToDelete.length > 0) 
        //     await this.journalEntryActivityRepo.delete(activityToDelete);
        journalEntry.entityStatus.entityStatusId = EntityStatusEnum.DELETED.toString();
        return await this.journalEntryRepo.save(journalEntry);
      } catch (e) {
        throw e;
      }
    }
}
