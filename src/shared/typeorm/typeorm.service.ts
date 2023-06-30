/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { EntityStatus } from "../entities/EntityStatus";
import { Gender } from "../entities/Gender";
import { Users } from "../entities/Users";
import { Injectable, Inject } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Messages } from "../entities/Messages";
import { Notifications } from "../entities/Notifications";
import { GatewayConnectedUsers } from "../entities/GatewayConnectedUsers";
import { Files } from "../entities/Files";
import { UserProfilePic } from "../entities/UserProfilePic";
import { UserActivityType } from "../entities/UserActivityType";
import { UserActivityLog } from "../entities/UserActivityLog";
import { JournalEntry } from "../entities/JournalEntry";
import { ActivityType } from "../entities/ActivityType";
import { MoodEntity } from "../entities/MoodEntity";
import { HeartRateLog } from "../entities/HeartRateLog";
import { JournalEntryActivity } from "../entities/JournalEntryActivity";
import { SystemConfig } from "../entities/SystemConfig";
import { NotificationType } from "../entities/NotificationType";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  @Inject(ConfigService)
  private readonly config: ConfigService;

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    const ssl = this.config.get<string>("SSL");
    let config: TypeOrmModuleOptions = {
      type: "postgres",
      host: this.config.get<string>("DATABASE_HOST"),
      port: Number(this.config.get<number>("DATABASE_PORT")),
      database: this.config.get<string>("DATABASE_NAME"),
      username: this.config.get<string>("DATABASE_USER"),
      password: this.config.get<string>("DATABASE_PASSWORD"),
      entities: [
        Users,
        Gender,
        EntityStatus,
        Notifications,
        Messages,
        GatewayConnectedUsers,
        Files,
        UserProfilePic,
        UserActivityType,
        UserActivityLog,
        JournalEntry,
        ActivityType,
        MoodEntity,
        JournalEntryActivity,
        HeartRateLog,
        SystemConfig,
        NotificationType,
      ],
      synchronize: false,// never use TRUE in production!
      ssl: ssl.toLocaleLowerCase().includes("true"),
      extra: {

      }
    }
    if(config.ssl) {
      config.extra.ssl = {
        require: true,
        rejectUnauthorized: false,
      }
    }
    return config;
  }
}
