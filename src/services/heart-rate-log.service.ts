/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { DateConstant } from 'src/common/constant/date.constant';
import { EntityStatusEnum } from 'src/common/enums/entity-status.enum';
import { HeartRateStatusEnum } from 'src/common/enums/heart-rate-status.enum';
import { MoodEntityEnum } from 'src/common/enums/mood-entity.enum';
import { getAge, getHearRateTargetPercentage, round } from 'src/common/utils/utils';
import { CreateHeartRateLogDto } from 'src/core/dto/heart-rate-log/heart-rate-log.create.dto';
import { HeartRateLog } from 'src/shared/entities/HeartRateLog';
import { MoodEntity } from 'src/shared/entities/MoodEntity';
import { Users } from 'src/shared/entities/Users';
import { Repository } from 'typeorm';

@Injectable()
export class HeartRateLogService {
    constructor(
      @InjectRepository(HeartRateLog)
      private readonly heartRateLogRepo: Repository<HeartRateLog>
    ) {}
  
    async getHeartRateStatus(userId: string, value: number) {
      try {
        const currentUser = await this.heartRateLogRepo.manager
        .findOneBy(Users, { userId, entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() } });
        if(!currentUser) {
          throw new HttpException("User not found", HttpStatus.NOT_FOUND);
        }
        const age = await getAge(new Date(moment(currentUser.birthDate).format("YYYY-MM-DD HH:mm:ss")));
        const percent = await getHearRateTargetPercentage(age, value);
        let score = 0;
        if(percent >= 70 && percent <= 100) {
          score = HeartRateStatusEnum.HEALTHY;
        }
        else if(percent >= 40 && percent < 70) {
          score = HeartRateStatusEnum.REGULAR;
        }
        else if(percent < 40) {
          score = HeartRateStatusEnum.IRREGULAR;
        }
        else if(percent > 100) {
          score = HeartRateStatusEnum.IRREGULAR;
        }
        return {
          heartRatePercentage: round(percent),
          heartRateScore: Number(score),
          heartRateStatus: HeartRateStatusEnum[score as HeartRateStatusEnum]
        }
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
    async findByDate(userId: string = "0", dateFrom: Date, dateTo: Date) {
      try {
        dateFrom = new Date(dateFrom.setHours(0,0,0,0));
        dateTo = new Date(new Date(dateTo.setDate(dateTo.getDate() + 1)).setHours(0,0,0,0));
        const result: HeartRateLog[] = await this.heartRateLogRepo.manager
        .createQueryBuilder("HeartRateLog", "hrl")
        .leftJoin("hrl.user", "u")
        .where("(hrl.timestamp between :dateFrom AND :dateTo) AND " +
            "u.userId = :userId"
        )
        .orderBy("hrl.timestamp", "DESC")
        .setParameters({
            dateFrom: moment.utc(dateFrom).format(),
            dateTo: moment.utc(dateTo).format(),
            userId
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
  
    async findOne(options?: any) {
      try {
        const heartRateLog = await this.heartRateLogRepo.findOne({
          where: options,
        });
        return heartRateLog;
      } catch (e) {
        console.log(e);
        throw e;
      }
    }
  
    async findById(heartRateLogId: string) {
      try {
        const heartRateLog = await this.findOne({
          heartRateLogId,
          entityStatus: { entityStatusId: EntityStatusEnum.ACTIVE.toString() },
        });
        if (!heartRateLog) {
          throw new HttpException("Heart RateLog not found", HttpStatus.NOT_FOUND);
        }
        heartRateLog.timestamp = new Date(heartRateLog.timestamp.toLocaleString('utc', {timeZone: 'utc'}));
        return heartRateLog;
      } catch (e) {
        throw e;
      }
    }
  
    async add(userId, createHeartRateLogDto: CreateHeartRateLogDto) {
      return await this.heartRateLogRepo.manager.transaction(
        async (entityManager) => {
          let heartRateLog = new HeartRateLog();
          const { timeZone } = createHeartRateLogDto.timestamp;
          const timestamp = await entityManager.query("select (now() AT TIME ZONE '" + timeZone + "'::text) as timestamp").then(res=> {
            return res[0]['timestamp'];
          });
          const find = await this.findByDate(userId, new Date(timestamp.toUTCString()), new Date(timestamp.toUTCString()));
          if(find && find.length > 0) {
            heartRateLog = find[0];
            heartRateLog.timestamp = timestamp;
            heartRateLog.value = createHeartRateLogDto.value;
            heartRateLog = await entityManager.save(HeartRateLog, heartRateLog);
          } else {
            heartRateLog = new HeartRateLog();
            heartRateLog.timestamp = timestamp;
            heartRateLog.value = createHeartRateLogDto.value;
            heartRateLog.user = await entityManager.findOneBy(Users,{
                userId
            });
            heartRateLog = await entityManager.save(HeartRateLog, heartRateLog);
            delete heartRateLog.user.password;
            delete heartRateLog.user.currentHashedRefreshToken;
            delete heartRateLog.user.firebaseToken;
          }
          return heartRateLog;
        }
      );
    }
  }
  