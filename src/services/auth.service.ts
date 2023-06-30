/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Users } from "../shared/entities/Users";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { LoginUserDto } from "../core/dto/users/user-login.dto";
import { JwtPayload } from "../core/interfaces/payload.interface";
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import * as path from "path";
import { compare, hash } from "src/common/utils/utils";
import { RoleEnum } from "src/common/enums/role.enum";
import { UserTypeEnum } from "src/common/enums/user-type.enum";
import { NotificationService } from "./notification.service";
import { UserActivityLogService } from "./user-activity-log.service";
import { ActivityTypeEnum } from "src/common/enums/activity-type.enum";
import * as moment from "moment";
import { DateConstant } from "src/common/constant/date.constant";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly userActivityLogService: UserActivityLogService,
    private readonly notificationService: NotificationService,
    private readonly jwtService: JwtService
  ) {}

  async register(userDto: CreateUserDto) {
    return await this.usersService.registerUser(userDto);
  }

  async login({ username, password }: any) {
    // find user in db
    const user = await this.usersService.findByLogin(
      username,
      password
    );

    // generate and sign token
    const { userId } = user;
    const accessToken: string = await this.getAccessToken(userId);
    const refreshToken: string = await this.getRefreshToken(userId);
    await this.updateRefreshTokenInUser(refreshToken, userId);
    const {
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      address,
      birthDate,
      age,
      gender,
      fullName,
    } = user;

    return {
      userId,
      username,
      fullName,
      firstName,
      middleName,
      lastName,
      email,
      mobileNumber,
      address,
      birthDate,
      age,
      gender,
      accessToken,
      refreshToken,
      userProfilePic: user.userProfilePic
        ? user.userProfilePic.file.url
        : null,
    };
  }

  async logOut(userId: string, headers?) {
    var uaParser = require('ua-parser-js');
    let uaInfo: { browser: { name: string }, os: { name: string; version: string }} = uaParser(headers['user-agent']);
    await this.userActivityLogService.log(
      ActivityTypeEnum.USER_LOGOUT.toString(), 
      userId, 
      new Date(),
      uaInfo.os.name,
      uaInfo.os.version,
      uaInfo.browser.name,
      )
    await this.updateRefreshTokenInUser(null, userId);
  }

  private getAccessToken(userId: string): any {
    const secret = fs.readFileSync(path.join(__dirname, "../../private.key"));
    const expiresIn = "1hr";

    const user: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(user, {
      secret: secret,
      expiresIn: expiresIn,
      algorithm: "RS256",
    });
    return accessToken;
  }

  async getRefreshToken(userId: string) {
    const secret = fs.readFileSync(
      path.join(__dirname, "../../refreshtoken.private.key")
    );
    const expiresIn = "1hr";

    const user: JwtPayload = { userId };
    const accessToken = this.jwtService.sign(user, {
      secret: secret,
      expiresIn: expiresIn,
      algorithm: "RS256",
    });
    return accessToken;
  }

  async updateRefreshTokenInUser(refreshToken, userId) {
    if (refreshToken) {
      refreshToken = await hash(refreshToken);
    }

    return await this.usersService.setCurrentRefreshToken(refreshToken, userId);
  }

  async getNewAccessAndRefreshToken(userId: string) {
    const refreshToken = await this.getRefreshToken(userId);
    await this.updateRefreshTokenInUser(refreshToken, userId);

    return {
      accessToken: await this.getAccessToken(userId),
      refreshToken: refreshToken,
    };
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const result = await this.usersService.getRefreshTokenUserById(userId);

    const isRefreshTokenMatching = await compare(
      result.refresh_token,
      refreshToken
    );

    if (isRefreshTokenMatching) {
      await this.updateRefreshTokenInUser(null, userId);
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }

  async findByUserName(username) {
    return await this.usersService.findByUsername(username);
  }

  verifyJwt(jwt: string): Promise<any> {
    try {
      return this.jwtService.verifyAsync(jwt, {
        secret: fs.readFileSync(path.join(__dirname, "../../private.key")),
        algorithms: ["RS256"],
      });
    } catch (ex) {
      throw ex;
    }
  }
}
