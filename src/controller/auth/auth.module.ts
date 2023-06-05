import { Module } from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { LocalStrategy } from "../../core/auth/local.strategy";
import { JwtStrategy } from "../../core/auth/jwt.strategy";
import { UsersModule } from "../users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { AuthController } from "./auth.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "src/shared/entities/Users";
import { NotificationModule } from "../notification/notification.module";
import { FirebaseProviderModule } from "src/core/provider/firebase/firebase-provider.module";
import { FileModule } from "../file/file.module";
import { UserActivityLogModule } from "../user-activity-log/user-activity-log.module";

@Module({
  imports: [
    UsersModule,
    FileModule,
    NotificationModule,
    UserActivityLogModule,
    PassportModule.register({}),
    JwtModule.register({}),
    TypeOrmModule.forFeature([Users]),
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
