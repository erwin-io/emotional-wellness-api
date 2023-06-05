import { Module } from '@nestjs/common';
import { UserActivityType } from 'src/shared/entities/UserActivityType';
import { UserActivityLogController } from './user-activity-log.controller';
import { UserActivityLogService } from 'src/services/user-activity-log.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserActivityLog } from 'src/shared/entities/UserActivityLog';
import { UsersModule } from '../users/users.module';

@Module({
    imports: [
      UsersModule,
      TypeOrmModule.forFeature([UserActivityLog]),
    ],
    controllers: [UserActivityLogController],
    providers: [UserActivityLogService],
    exports: [UserActivityLogService],
})
export class UserActivityLogModule {}
