import { Users } from "../shared/entities/Users";
import { UsersService } from "../services/users.service";
import { JwtService } from "@nestjs/jwt";
import { NotificationService } from "./notification.service";
import { UserActivityLogService } from "./user-activity-log.service";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";
export declare class AuthService {
    private readonly usersService;
    private readonly userActivityLogService;
    private readonly notificationService;
    private readonly jwtService;
    constructor(usersService: UsersService, userActivityLogService: UserActivityLogService, notificationService: NotificationService, jwtService: JwtService);
    register(userDto: CreateUserDto): Promise<Users>;
    login({ mobileNumber, password }: any): Promise<{
        userId: string;
        mobileNumber: any;
        name: string;
        birthDate: string;
        age: string;
        gender: import("../core/view-model/gender.view-model").GenderViewModel;
        accessToken: string;
        refreshToken: string;
        petCompanion: import("../core/view-model/user.view-model").PetCompanionViewModel;
        userProfilePic: string;
    }>;
    logOut(userId: string, headers?: any): Promise<void>;
    private getAccessToken;
    getRefreshToken(userId: string): Promise<string>;
    updateRefreshTokenInUser(refreshToken: any, userId: any): Promise<import("typeorm").UpdateResult>;
    getNewAccessAndRefreshToken(userId: string): Promise<{
        accessToken: any;
        refreshToken: string;
    }>;
    getUserIfRefreshTokenMatches(refreshToken: string, userId: string): Promise<{
        userId: any;
        refresh_token: any;
    }>;
    findByMobileNumber(mobileNumber: any): Promise<Users>;
    verifyJwt(jwt: string): Promise<any>;
}
