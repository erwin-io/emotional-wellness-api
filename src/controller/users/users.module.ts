import { UsersController } from "./users.controller";
import { Module } from "@nestjs/common";
import { UsersService } from "../../services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Users } from "../../shared/entities/Users";
import { FirebaseProviderModule } from "src/core/provider/firebase/firebase-provider.module";
import { Pet } from "src/shared/entities/Pet";
import { PetModule } from "../pet/pet.module";
@Module({
  imports: [
    PetModule,
    FirebaseProviderModule,
    TypeOrmModule.forFeature([Users, Pet]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
