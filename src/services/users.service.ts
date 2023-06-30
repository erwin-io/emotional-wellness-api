/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { EntityManager, Repository } from "typeorm";
import {
  compare,
  hash,
  getAge,
} from "../common/utils/utils";
import { Users } from "../shared/entities/Users";
import { Gender } from "../shared/entities/Gender";
import { EntityStatus } from "../shared/entities/EntityStatus";
import { UserViewModel } from "src/core/view-model/user.view-model";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { UserProfilePic } from "src/shared/entities/UserProfilePic";
import { unlinkSync, writeFile } from "fs";
import { Files } from "src/shared/entities/Files";
import { extname, join } from "path";
import { v4 as uuid } from "uuid";
import * as moment from "moment";
import { DateConstant } from "src/common/constant/date.constant";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";
import { UpdateProfilePictureDto, UpdateUserDto } from "src/core/dto/users/user.update.dto";

@Injectable()
export class UsersService {
  constructor(
    private firebaseProvoder: FirebaseProvider,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>
  ) {}

  async findUserByFilter(
    advanceSearch: boolean,
    keyword: string,
    userId: string,
    username: string,
    email: string,
    mobileNumber: string,
    name: string
  ) {
    const params: any = {
      keyword: `%${keyword}%`,
    };
    let query = await this.userRepo.manager
      .createQueryBuilder("user", "u")
      .innerJoinAndSelect("u.gender", "g");

    if (advanceSearch) {
      query = query.andWhere(
        "CONCAT(u.firstName, ' ', COALESCE(u.middleName, ''), ' ', u.lastName) LIKE :name"
      );
      query = query
        .where("cast(u.userId as character varying) like :userId")
        .andWhere("u.username like :username")
        .andWhere("u.email like :email")
        .andWhere("cast(u.mobileNumber as character varying) like :mobileNumber")
        .orderBy("u.userId", "DESC");
      params.userId = `%${userId}%`;
      params.username = `%${username}%`;
      params.email = `%${email}%`;
      params.mobileNumber = `%${mobileNumber}%`;
      params.name = `%${name}%`;
    } else {
      query = query
        .where("cast(u.userId as character varying) like :keyword")
        .orWhere("u.username like :keyword")
        .orWhere("u.email like :keyword")
        .orWhere("cast(c.mobileNumber as character varying) like :keyword")
        .orWhere("COALESCE(u.firstName, '') like :keyword")
        .orWhere("COALESCE(u.middleName, '') like :keyword")
        .orWhere("COALESCE(u.lastName, '') like :keyword")
        .orderBy("u.userId", "DESC");
    }
    query = query.setParameters(params);
    return (<Users[]>await query.getMany()).map((u: Users) => {
      return new UserViewModel(u);
    });
  }

  async findOne(
    options?: any,
    entityManager?: EntityManager
  ) {
    const user: any = await entityManager.findOne(Users, {
      where: options,
      relations: {
        userProfilePic: { file: true },
        entityStatus: true,
        gender: true
      },
    });
    return user;
  }

  async findById(userId: string) {
    const result = await this.findOne({ userId }, this.userRepo.manager);
    if (!result) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return result;

  }

  async findUserById(userId: string) {
    const result = await this.userRepo.findOneBy({ userId });
    if (!result) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return result;
  }

  async findByUsername(username) {
    const result = await this.findOne(
      { username },
      this.userRepo.manager
    );
    if (result === (null || undefined)) return null;
    return this._sanitizeUser(result.user);
  }

  async findByLogin(username, password) {
    const user = await this.findOne(
      { username },
      this.userRepo.manager
    );
    if (!user) {
      throw new HttpException("Username not found", HttpStatus.NOT_FOUND);
    }
    const areEqual = await compare(user.password, password);
    if (!areEqual) {
      throw new HttpException("Invalid credentials", HttpStatus.NOT_ACCEPTABLE);
    }
    const isExpired = await this.userRepo.manager.query(`select ((now() AT TIME ZONE 'Asia/Manila'::text)::timestamp > ("Expire" AT TIME ZONE 'Asia/Manila'::text)::timestamp) as isExpired FROM dbo."Users" where "UserId" = '${user.userId}';`).then(res=> {
      return res[0]['isexpired'];
    });
    if(isExpired === undefined) {
      throw new HttpException("Invalid credentials", HttpStatus.NOT_ACCEPTABLE);
    }
    if(isExpired) {
      throw new HttpException("User account expired", HttpStatus.NOT_ACCEPTABLE);
    }
    return new UserViewModel(this._sanitizeUser(user));
  }

  async isUserExpired(userId) {
    const isExpired = await this.userRepo.manager.query(`select ((now() AT TIME ZONE 'Asia/Manila'::text)::timestamp > ("Expire" AT TIME ZONE 'Asia/Manila'::text)::timestamp) as isExpired FROM dbo."Users" where "UserId" = '${userId}';`).then(res=> {
      return res[0]['isexpired'];
    });
    return isExpired;
  }

  async getUserOutdatedJournal(interval: number) {
    const query = `select "UserId" as "userId","FirebaseToken" as "firebaseToken"  FROM dbo."Users" where ((now() AT TIME ZONE 'Asia/Manila'::text)::timestamp + interval '-${interval}sec') > ("LastJournalEntry" AT TIME ZONE 'Asia/Manila'::text)::timestamp`
    const users: { userId: string; firebaseToken :string; }[] = await this.userRepo.manager.query(query).then(res=> { 
      return res;
    });
    return users;
  }

  async registerUser(userDto: CreateUserDto) {
    const { username } = userDto;
    return await this.userRepo.manager.transaction(async (entityManager) => {
      const userInDb = await this.findOne({ username }, entityManager);
      if (userInDb) {
        throw new HttpException("Username already exist", HttpStatus.CONFLICT);
      }
      let user = new Users();
      user.username = userDto.username;
      user.password = await hash(userDto.password);
      user.entityStatus = new EntityStatus();
      user.entityStatus.entityStatusId = "1";
      user.firstName = userDto.firstName;
      user.middleName = userDto.middleName;
      user.lastName = userDto.lastName;
      user.email = userDto.email;
      user.mobileNumber = userDto.mobileNumber;
      user.birthDate = moment(userDto.birthDate).format("YYYY-MM-DD");
      user.age = await (await getAge(new Date(userDto.birthDate))).toString();
      user.address = userDto.address;
      user.gender = new Gender();
      user.gender.genderId = userDto.genderId;
      user = await entityManager.save(Users, user);
      return await this._sanitizeUser(user);
    });
  }

  async updateUser(userDto: UpdateUserDto) {
    const userId = userDto.userId;

    return await this.userRepo.manager.transaction(async (entityManager) => {
      let user: any = await this.findOne(
        {
          userId,
        },
        entityManager
      );
      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
      }
      user.firstName = userDto.firstName;
      user.middleName = userDto.middleName;
      user.lastName = userDto.lastName;
      user.email = userDto.email;
      user.mobileNumber = userDto.mobileNumber;
      user.birthDate = userDto.birthDate;
      user.age = await (await getAge(userDto.birthDate)).toString();
      user.address = userDto.address;
      user.gender = new Gender();
      user.gender.genderId = userDto.genderId;
      user = await entityManager.save(Users, user);
      return await this._sanitizeUser(user);
    });
  }

  async updateProfilePicture(dto: UpdateProfilePictureDto) {
    const userId = dto.userId;
    return await this.userRepo.manager.transaction(async (entityManager) => {
      let user: any = await this.findOne(
        {
          userId,
        },
        entityManager
      );
      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
      }
      if (dto.userProfilePic) {
        const newFileName: string = uuid();
        let userProfilePic = await entityManager.findOne(UserProfilePic, {
          where: { userId: user.userId },
          relations: ["file"],
        });
        const bucket = this.firebaseProvoder.app.storage().bucket();
        if (userProfilePic) {
          try {
            const deleteFile = bucket.file(
              `profile/${userProfilePic.file.fileName}`
            );
            deleteFile.delete();
          } catch (ex) {
            console.log(ex);
          }
          const file = userProfilePic.file;
          file.fileName = `${newFileName}${extname(
            dto.userProfilePic.fileName
          )}`;

          const bucketFile = bucket.file(
            `profile/${newFileName}${extname(dto.userProfilePic.fileName)}`
          );
          const img = Buffer.from(dto.userProfilePic.data, "base64");
          return await bucketFile.save(img).then(async (res) => {
            console.log("res");
            console.log(res);
            const url = await bucketFile.getSignedUrl({
              action: "read",
              expires: "03-09-2500",
            });

            file.url = url[0];
            userProfilePic.file = await entityManager.save(Files, file);
            user.userProfilePic = await entityManager.save(
              UserProfilePic,
              userProfilePic
            );
            user = await this.findOne({ userId }, entityManager);
            return await this._sanitizeUser(user);
          });
        } else {
          userProfilePic = new UserProfilePic();
          userProfilePic.user = user;
          const file = new Files();
          file.fileName = `${newFileName}${extname(
            dto.userProfilePic.fileName
          )}`;
          const bucketFile = bucket.file(
            `profile/${newFileName}${extname(dto.userProfilePic.fileName)}`
          );
          const img = Buffer.from(dto.userProfilePic.data, "base64");
          return await bucketFile.save(img).then(async () => {
            const url = await bucketFile.getSignedUrl({
              action: "read",
              expires: "03-09-2500",
            });
            file.url = url[0];
            userProfilePic.file = await entityManager.save(Files, file);
            user.userProfilePic = await entityManager.save(
              UserProfilePic,
              userProfilePic
            );
            return await this.findOne({ userId }, entityManager);
          });
        }
      }
    });
  }

  async getRefreshTokenUserById(userId: string) {
    const result = await this.findOne({ userId }, this.userRepo.manager);
    if (!result) {
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    }
    return {
      userId: result.userId,
      refresh_token: result.currentHashedRefreshToken,
    };
  }

  async setCurrentRefreshToken(
    currentHashedRefreshToken: string,
    userId: number
  ) {
    return await this.userRepo.update(userId, {
      currentHashedRefreshToken,
    });
  }

  async updateFirebaseToken(userId: string, firebaseToken: string) {
    if (firebaseToken && firebaseToken !== "") {
      this.firebaseProvoder.app
        .messaging()
        .subscribeToTopic([firebaseToken], "announcements");
    }
    await this.userRepo.update(userId, {
      firebaseToken,
    });

    return await this.findOne({ userId }, this.userRepo.manager);
  }

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    return await this.userRepo.manager.transaction(async (entityManager) => {
      let user: Users = await entityManager.findOne(Users, {
        where: {
          userId,
        },
      });

      if (!user) {
        throw new HttpException(`User doesn't exist`, HttpStatus.NOT_FOUND);
      }

      const areEqual = await compare(user.password, currentPassword);
      if (!areEqual) {
        throw new HttpException(
          "Password not match",
          HttpStatus.NOT_ACCEPTABLE
        );
      }

      (user.password = await hash(newPassword)),
        (user = await entityManager.save(Users, user));
      return this._sanitizeUser(user);
    });
  }

  async updatePassword(userId: string, password: string) {
    await this.userRepo.update(userId, {
      password: await hash(password),
    });

    return await this.findOne({ userId }, this.userRepo.manager);
  }

  private _sanitizeUser(user: Users) {
    delete user.password;
    delete user.currentHashedRefreshToken;
    return user;
  }
}
