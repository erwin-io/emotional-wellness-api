import { Module } from "@nestjs/common";
import { SystemConfigController } from "./system-config.controller";
import { SystemConfig } from "src/shared/entities/SystemConfig";
import { SystemConfigService } from "src/services/system-config.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [TypeOrmModule.forFeature([SystemConfig])],
  controllers: [SystemConfigController],
  providers: [SystemConfigService],
  exports: [SystemConfigService],
})
export class SystemConfigModule {}
