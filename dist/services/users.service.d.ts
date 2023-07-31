import { EntityManager, Repository } from "typeorm";
import { Users } from "../shared/entities/Users";
import { UserViewModel } from "src/core/view-model/user.view-model";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";
import { UpdatePetCompanionDto, UpdateProfilePictureDto, UpdateUserDto } from "src/core/dto/users/user.update.dto";
export declare class UsersService {
    private firebaseProvoder;
    private readonly userRepo;
    constructor(firebaseProvoder: FirebaseProvider, userRepo: Repository<Users>);
    findUserByFilter(advanceSearch: boolean, keyword: string, userId: string, email: string, mobileNumber: string, name: string): Promise<UserViewModel[]>;
    findOne(options?: any, entityManager?: EntityManager): Promise<any>;
    findById(userId: string): Promise<any>;
    findUserById(userId: string): Promise<Users>;
    findByMobileNumber(mobileNumber: any): Promise<Users>;
    findByLogin(mobileNumber: any, password: any): Promise<UserViewModel>;
    isUserExpired(userId: any): Promise<any>;
    getUserOutdatedJournal(interval: number): Promise<{
        userId: string;
        firebaseToken: string;
    }[]>;
    registerUser(userDto: CreateUserDto): Promise<Users>;
    updateUser(userDto: UpdateUserDto): Promise<Users>;
    updateProfilePicture(dto: UpdateProfilePictureDto): Promise<any>;
    getRefreshTokenUserById(userId: string): Promise<{
        userId: any;
        refresh_token: any;
    }>;
    setCurrentRefreshToken(currentHashedRefreshToken: string, userId: number): Promise<import("typeorm").UpdateResult>;
    updateFirebaseToken(userId: string, firebaseToken: string): Promise<any>;
    changePassword(userId: string, currentPassword: string, newPassword: string): Promise<Users>;
    updatePassword(userId: string, password: string): Promise<any>;
    updateJournalReminderDate(userId: string): Promise<Users>;
    updatePetCompanion(dto: UpdatePetCompanionDto): Promise<Users>;
    private _sanitizeUser;
}
