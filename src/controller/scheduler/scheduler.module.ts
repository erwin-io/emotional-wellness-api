import { Module } from "@nestjs/common";
import { FirebaseProviderModule } from "src/core/provider/firebase/firebase-provider.module";
import { SchedulerService } from "src/services/scheduler.service";
import { NotificationModule } from "../notification/notification.module";
import { SchedulerController } from "./scheduler.controller";
import { UsersModule } from "../users/users.module";
import { SystemConfigModule } from "../system-config/system-config.module";

@Module({
  imports: [
    SystemConfigModule,
    UsersModule,
    NotificationModule,
    FirebaseProviderModule,
  ],
  controllers: [SchedulerController],
  providers: [SchedulerService],
  exports: [SchedulerService],
})
export class SchedulerModule {}
