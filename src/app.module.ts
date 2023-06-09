import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { UsersModule } from "./controller/users/users.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./shared/typeorm/typeorm.service";
import { getEnvPath } from "./common/helper/env.helper";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./controller/auth/auth.module";
import { FileModule } from "./controller/file/file.module";
import { DashboardModule } from "./controller/dashboard/dashboard.module";
import { FirebaseProviderModule } from "./core/provider/firebase/firebase-provider.module";
import * as Joi from "@hapi/joi";
import { UserActivityLogModule } from "./controller/user-activity-log/user-activity-log.module";
import { JournalEntryModule } from "./controller/journal-entry/journal-entry.module";
import { HeartRateLogModule } from "./controller/heart-rate-log/heart-rate-log.module";
import { MoodSentimentModule } from "./controller/mood-sentiment/mood-sentiment.module";
import { SystemConfigModule } from "./controller/system-config/system-config.module";
import { SchedulerModule } from "./controller/scheduler/scheduler.module";
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    UsersModule,
    FileModule,
    DashboardModule,
    FirebaseProviderModule,
    UserActivityLogModule,
    JournalEntryModule,
    HeartRateLogModule,
    MoodSentimentModule,
    SystemConfigModule,
    SchedulerModule,
  ],
  providers: [AppService],
  controllers: [],
})
export class AppModule {}
