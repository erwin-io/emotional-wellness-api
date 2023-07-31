import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import moment from "moment";
import { DateConstant } from "src/common/constant/date.constant";
import { ActivityTypeEnum } from "src/common/enums/activity-type.enum";
import { EntityStatusEnum } from "src/common/enums/entity-status.enum";
import { UserActivityLog } from "src/shared/entities/UserActivityLog";
import { UserActivityType } from "src/shared/entities/UserActivityType";
import { Users } from "src/shared/entities/Users";
import { Between, EntityManager, Not, Repository } from "typeorm";
import { UsersService } from "./users.service";

@Injectable()
export class UserActivityLogService {
  constructor(
    @InjectRepository(UserActivityLog)
    private readonly userActivityLogRepo: Repository<UserActivityLog>,
    private readonly usersService: UsersService
  ) {}
  async findByFilter(
    userTypeId: string,
    userActivityTypeId: string[],
    name: string,
    dateFrom: Date,
    dateTo: Date
  ) {
    try {
      const params: any = {
        userActivityTypeId:
          userActivityTypeId.length === 0
            ? [
                ActivityTypeEnum.USER_LOGIN.toString(),
                ActivityTypeEnum.USER_LOGOUT.toString(),
              ]
            : userActivityTypeId,
        userTypeId,
        name: `%${name.toLowerCase()}%`,
      };
      dateFrom = new Date(dateFrom.setHours(0, 0, 0, 0));
      dateTo = new Date(
        new Date(dateTo.setDate(dateFrom.getDate() + 1)).setHours(0, 0, 0, 0)
      );
      params.dateFrom = moment(dateFrom).format("YYYY-MM-DD HH:mm:ss");
      params.dateTo = moment(dateTo).format("YYYY-MM-DD HH:mm:ss");
      const query = await this.userActivityLogRepo.manager
        .createQueryBuilder("UserActivityLog", "al")
        .leftJoinAndSelect("al.userActivityType", "at")
        .leftJoinAndSelect("al.user", "u")
        .leftJoinAndSelect("u.staff", "s")
        .leftJoinAndSelect("u.userType", "ut")
        .where(
          "(LOWER(u.mobileNumber) LIKE :name OR " +
            "LOWER(s.name) LIKE :name) AND " +
            "(al.date between :dateFrom AND :dateTo) AND " +
            "at.userActivityTypeId IN(:...userActivityTypeId) AND " +
            "ut.userTypeId = :userTypeId"
        )
        .orderBy("al.date", "DESC")
        .setParameters(params)
        .getMany();
      return query.map((x: UserActivityLog) => {
        delete x.user.password;
        delete x.user.currentHashedRefreshToken;
        delete x.user.firebaseToken;
        return x;
      });
    } catch (e) {
      throw e;
    }
  }

  async log(
    userActivityTypeId: string,
    userId: string,
    date: Date,
    os: string,
    osVersion: string,
    browser: string
  ) {
    try {
      date = new Date(moment(date).format("YYYY-MM-DD HH:mm:ss"));
      return await this.userActivityLogRepo.manager.transaction(
        async (entityManager) => {
          //login
          if (
            Number(userActivityTypeId) === Number(ActivityTypeEnum.USER_LOGIN)
          ) {
            return this.userLogin(
              entityManager,
              userId,
              date,
              os,
              osVersion,
              browser
            );
          } else if (
            Number(userActivityTypeId) === Number(ActivityTypeEnum.USER_LOGOUT)
          ) {
            return this.userLogout(
              entityManager,
              userId,
              date,
              os,
              osVersion,
              browser
            );
          }
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async userLogin(
    entityManager: EntityManager,
    userId: string,
    date: Date,
    os: string,
    osVersion: string,
    browser: string
  ) {
    const userActivityTypeId = ActivityTypeEnum.USER_LOGIN.toString();
    let userActivityLog = new UserActivityLog();
    const lastActivitySameDevice = await entityManager.find(UserActivityLog, {
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
    const lastActivityOtherDevice = await entityManager.find(UserActivityLog, {
      where: [
        {
          user: { userId },
          os: Not(os),
          osVersion: osVersion,
          browser: browser,
        },
        {
          user: { userId },
          os: os,
          osVersion: Not(osVersion),
          browser: browser,
        },
        {
          user: { userId },
          os: os,
          osVersion: osVersion,
          browser: Not(browser),
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
    if (
      lastActivitySameDevice[0] &&
      lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGOUT.toString() &&
      !lastActivityOtherDevice[0] &&
      lastActivityOtherDevice[0] === undefined
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    } else if (
      lastActivitySameDevice[0] &&
      lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGOUT.toString() &&
      lastActivityOtherDevice[0] &&
      lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGIN.toString()
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        {
          where: {
            userActivityTypeId: ActivityTypeEnum.USER_LOGOUT.toString(),
          },
        }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = lastActivityOtherDevice[0].os;
      userActivityLog.osVersion = lastActivityOtherDevice[0].osVersion;
      userActivityLog.browser = lastActivityOtherDevice[0].browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );

      await this.usersService.setCurrentRefreshToken(null, Number(userId));

      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    } else if (
      lastActivitySameDevice[0] &&
      lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGIN.toString()
    ) {
      userActivityLog = lastActivitySameDevice[0];
      userActivityLog.date = date;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    } else if (
      (!lastActivitySameDevice[0] ||
        !lastActivitySameDevice[0] === undefined) &&
      lastActivityOtherDevice[0] &&
      (lastActivityOtherDevice[0].os !== os ||
        lastActivityOtherDevice[0].osVersion !== osVersion ||
        lastActivityOtherDevice[0].browser !== browser) &&
      lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGOUT.toString()
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    } else if (
      (!lastActivitySameDevice[0] ||
        !lastActivitySameDevice[0] === undefined) &&
      lastActivityOtherDevice[0] &&
      (lastActivityOtherDevice[0].os !== os ||
        lastActivityOtherDevice[0].osVersion !== osVersion ||
        lastActivityOtherDevice[0].browser !== browser) &&
      lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGIN.toString()
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        {
          where: {
            userActivityTypeId: ActivityTypeEnum.USER_LOGOUT.toString(),
          },
        }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = lastActivityOtherDevice[0].os;
      userActivityLog.osVersion = lastActivityOtherDevice[0].osVersion;
      userActivityLog.browser = lastActivityOtherDevice[0].browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );

      await this.usersService.setCurrentRefreshToken(null, Number(userId));

      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    } else {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );
    }
    return userActivityLog;
  }

  async userLogout(
    entityManager: EntityManager,
    userId: string,
    date: Date,
    os: string,
    osVersion: string,
    browser: string
  ) {
    const userActivityTypeId = ActivityTypeEnum.USER_LOGOUT.toString();
    let userActivityLog = new UserActivityLog();

    const lastActivitySameDevice = await entityManager.find(UserActivityLog, {
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
    const lastActivityOtherDevice = await entityManager.find(UserActivityLog, {
      where: [
        {
          user: { userId },
        },
        {
          os: Not(os),
        },
        {
          osVersion: Not(osVersion),
        },
        {
          browser: Not(browser),
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

    if (
      lastActivitySameDevice[0] &&
      lastActivitySameDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGIN.toString()
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );

      await this.usersService.setCurrentRefreshToken(null, Number(userId));
    } else if (
      (!lastActivitySameDevice[0] ||
        !lastActivitySameDevice[0] === undefined) &&
      lastActivityOtherDevice[0] &&
      (lastActivityOtherDevice[0].os !== os ||
        lastActivityOtherDevice[0].osVersion !== osVersion ||
        lastActivityOtherDevice[0].browser !== browser) &&
      lastActivityOtherDevice[0].userActivityType.userActivityTypeId ===
        ActivityTypeEnum.USER_LOGIN.toString()
    ) {
      userActivityLog = new UserActivityLog();
      userActivityLog.userActivityType = await entityManager.findOne(
        UserActivityType,
        { where: { userActivityTypeId: userActivityTypeId } }
      );
      userActivityLog.user = await entityManager.findOne(Users, {
        where: { userId: userId },
      });
      userActivityLog.date = date;
      userActivityLog.os = os;
      userActivityLog.osVersion = osVersion;
      userActivityLog.browser = browser;
      userActivityLog = await entityManager.save(
        UserActivityLog,
        userActivityLog
      );

      await this.usersService.setCurrentRefreshToken(null, Number(userId));
    }
    return userActivityLog;
  }
}
