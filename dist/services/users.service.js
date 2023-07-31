"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const utils_1 = require("../common/utils/utils");
const Users_1 = require("../shared/entities/Users");
const Gender_1 = require("../shared/entities/Gender");
const EntityStatus_1 = require("../shared/entities/EntityStatus");
const user_view_model_1 = require("../core/view-model/user.view-model");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const UserProfilePic_1 = require("../shared/entities/UserProfilePic");
const Files_1 = require("../shared/entities/Files");
const path_1 = require("path");
const uuid_1 = require("uuid");
const moment = require("moment");
const entity_status_enum_1 = require("../common/enums/entity-status.enum");
const PetCompanion_1 = require("../shared/entities/PetCompanion");
let UsersService = class UsersService {
    constructor(firebaseProvoder, userRepo) {
        this.firebaseProvoder = firebaseProvoder;
        this.userRepo = userRepo;
    }
    async findUserByFilter(advanceSearch, keyword, userId, email, mobileNumber, name) {
        const params = {
            keyword: `%${keyword}%`,
        };
        let query = await this.userRepo.manager
            .createQueryBuilder("user", "u")
            .innerJoinAndSelect("u.gender", "g");
        if (advanceSearch) {
            query = query.andWhere("CONCAT(u.firstName, ' ', COALESCE(u.middleName, ''), ' ', u.lastName) LIKE :name");
            query = query
                .where("cast(u.userId as character varying) like :userId")
                .andWhere("u.email like :email")
                .andWhere("cast(u.mobileNumber as character varying) like :mobileNumber")
                .orderBy("u.userId", "DESC");
            params.userId = `%${userId}%`;
            params.mobileNumber = `%${mobileNumber}%`;
            params.name = `%${name}%`;
        }
        else {
            query = query
                .where("cast(u.userId as character varying) like :keyword")
                .orWhere("u.email like :keyword")
                .orWhere("cast(c.mobileNumber as character varying) like :keyword")
                .orWhere("COALESCE(u.firstName, '') like :keyword")
                .orWhere("COALESCE(u.middleName, '') like :keyword")
                .orWhere("COALESCE(u.lastName, '') like :keyword")
                .orderBy("u.userId", "DESC");
        }
        query = query.setParameters(params);
        return (await query.getMany()).map((u) => {
            return new user_view_model_1.UserViewModel(u);
        });
    }
    async findOne(options, entityManager) {
        const user = await entityManager.findOne(Users_1.Users, {
            where: options,
            relations: {
                userProfilePic: { file: true },
                entityStatus: true,
                gender: true,
                petCompanion: true
            },
        });
        return user;
    }
    async findById(userId) {
        const result = await this.findOne({ userId }, this.userRepo.manager);
        if (!result) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async findUserById(userId) {
        const result = await this.userRepo.findOneBy({ userId });
        if (!result) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return result;
    }
    async findByMobileNumber(mobileNumber) {
        const result = await this.findOne({ mobileNumber }, this.userRepo.manager);
        if (result === (null || undefined))
            return null;
        return this._sanitizeUser(result.user);
    }
    async findByLogin(mobileNumber, password) {
        const user = await this.findOne({ mobileNumber }, this.userRepo.manager);
        if (!user) {
            throw new common_1.HttpException("Mobile number not found", common_1.HttpStatus.NOT_FOUND);
        }
        const areEqual = password === await (0, utils_1.AESDecrypt)(user.password);
        if (!areEqual) {
            throw new common_1.HttpException("Invalid credentials", common_1.HttpStatus.NOT_ACCEPTABLE);
        }
        return new user_view_model_1.UserViewModel(this._sanitizeUser(user));
    }
    async isUserExpired(userId) {
        const isExpired = await this.userRepo.manager.query(`select ((now() AT TIME ZONE 'Asia/Manila'::text)::timestamp > ("Expire" AT TIME ZONE 'Asia/Manila'::text)::timestamp) as isExpired FROM dbo."Users" where "UserId" = '${userId}';`).then(res => {
            return res[0]['isexpired'];
        });
        return isExpired;
    }
    async getUserOutdatedJournal(interval) {
        const query = `select "UserId" as "userId","FirebaseToken" as "firebaseToken"  FROM dbo."Users" where ((now() AT TIME ZONE 'Asia/Manila'::text)::timestamp - interval '${interval}sec') > "LastJournalEntry"`;
        const users = await this.userRepo.manager.query(query).then(res => {
            return res;
        });
        return users;
    }
    async registerUser(userDto) {
        const { mobileNumber, password, name, birthDate, genderId, petCompanionId } = userDto;
        return await this.userRepo.manager.transaction(async (entityManager) => {
            const userInDb = await this.findOne({ mobileNumber }, entityManager);
            if (userInDb) {
                throw new common_1.HttpException("Mobile number already exist", common_1.HttpStatus.CONFLICT);
            }
            let user = new Users_1.Users();
            user.name = name;
            user.password = await (0, utils_1.AESEncrypt)(password);
            user.entityStatus = new EntityStatus_1.EntityStatus();
            user.entityStatus.entityStatusId = entity_status_enum_1.EntityStatusEnum.ACTIVE.toString();
            user.mobileNumber = mobileNumber;
            user.birthDate = moment(birthDate).format("YYYY-MM-DD");
            user.age = await (await (0, utils_1.getAge)(new Date(birthDate))).toString();
            user.gender = new Gender_1.Gender();
            user.gender.genderId = genderId;
            user.petCompanion = await entityManager.findOneBy(PetCompanion_1.PetCompanion, {
                petCompanionId
            });
            user = await entityManager.save(Users_1.Users, user);
            return await this._sanitizeUser(user);
        });
    }
    async updateUser(userDto) {
        const userId = userDto.userId;
        return await this.userRepo.manager.transaction(async (entityManager) => {
            const { userId, name, birthDate, genderId } = userDto;
            let user = await this.findOne({
                userId,
            }, entityManager);
            if (!user) {
                throw new common_1.HttpException(`User doesn't exist`, common_1.HttpStatus.NOT_FOUND);
            }
            user.name = name;
            user.birthDate = moment(birthDate).format("YYYY-MM-DD");
            user.age = await (await (0, utils_1.getAge)(userDto.birthDate)).toString();
            user.gender = new Gender_1.Gender();
            user.gender.genderId = genderId;
            user = await entityManager.save(Users_1.Users, user);
            return await this._sanitizeUser(user);
        });
    }
    async updateProfilePicture(dto) {
        const userId = dto.userId;
        return await this.userRepo.manager.transaction(async (entityManager) => {
            let user = await this.findOne({
                userId,
            }, entityManager);
            if (!user) {
                throw new common_1.HttpException(`User doesn't exist`, common_1.HttpStatus.NOT_FOUND);
            }
            if (dto.userProfilePic) {
                const newFileName = (0, uuid_1.v4)();
                let userProfilePic = await entityManager.findOne(UserProfilePic_1.UserProfilePic, {
                    where: { userId: user.userId },
                    relations: ["file"],
                });
                const bucket = this.firebaseProvoder.app.storage().bucket();
                if (userProfilePic) {
                    try {
                        const deleteFile = bucket.file(`profile/${userProfilePic.file.fileName}`);
                        deleteFile.delete();
                    }
                    catch (ex) {
                        console.log(ex);
                    }
                    const file = userProfilePic.file;
                    file.fileName = `${newFileName}${(0, path_1.extname)(dto.userProfilePic.fileName)}`;
                    const bucketFile = bucket.file(`profile/${newFileName}${(0, path_1.extname)(dto.userProfilePic.fileName)}`);
                    const img = Buffer.from(dto.userProfilePic.data, "base64");
                    return await bucketFile.save(img).then(async (res) => {
                        console.log("res");
                        console.log(res);
                        const url = await bucketFile.getSignedUrl({
                            action: "read",
                            expires: "03-09-2500",
                        });
                        file.url = url[0];
                        userProfilePic.file = await entityManager.save(Files_1.Files, file);
                        user.userProfilePic = await entityManager.save(UserProfilePic_1.UserProfilePic, userProfilePic);
                        user = await this.findOne({ userId }, entityManager);
                        return await this._sanitizeUser(user);
                    });
                }
                else {
                    userProfilePic = new UserProfilePic_1.UserProfilePic();
                    userProfilePic.user = user;
                    const file = new Files_1.Files();
                    file.fileName = `${newFileName}${(0, path_1.extname)(dto.userProfilePic.fileName)}`;
                    const bucketFile = bucket.file(`profile/${newFileName}${(0, path_1.extname)(dto.userProfilePic.fileName)}`);
                    const img = Buffer.from(dto.userProfilePic.data, "base64");
                    return await bucketFile.save(img).then(async () => {
                        const url = await bucketFile.getSignedUrl({
                            action: "read",
                            expires: "03-09-2500",
                        });
                        file.url = url[0];
                        userProfilePic.file = await entityManager.save(Files_1.Files, file);
                        user.userProfilePic = await entityManager.save(UserProfilePic_1.UserProfilePic, userProfilePic);
                        return await this.findOne({ userId }, entityManager);
                    });
                }
            }
        });
    }
    async getRefreshTokenUserById(userId) {
        const result = await this.findOne({ userId }, this.userRepo.manager);
        if (!result) {
            throw new common_1.HttpException("User not found", common_1.HttpStatus.NOT_FOUND);
        }
        return {
            userId: result.userId,
            refresh_token: result.currentHashedRefreshToken,
        };
    }
    async setCurrentRefreshToken(currentHashedRefreshToken, userId) {
        return await this.userRepo.update(userId, {
            currentHashedRefreshToken,
        });
    }
    async updateFirebaseToken(userId, firebaseToken) {
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
    async changePassword(userId, currentPassword, newPassword) {
        return await this.userRepo.manager.transaction(async (entityManager) => {
            let user = await entityManager.findOne(Users_1.Users, {
                where: {
                    userId,
                },
            });
            if (!user) {
                throw new common_1.HttpException(`User doesn't exist`, common_1.HttpStatus.NOT_FOUND);
            }
            const areEqual = currentPassword === await (0, utils_1.AESDecrypt)(user.password);
            if (!areEqual) {
                throw new common_1.HttpException("Password not match", common_1.HttpStatus.NOT_ACCEPTABLE);
            }
            user.password = await (0, utils_1.AESEncrypt)(newPassword);
            user = await entityManager.save(Users_1.Users, user);
            return this._sanitizeUser(user);
        });
    }
    async updatePassword(userId, password) {
        await this.userRepo.update(userId, {
            password: await (0, utils_1.AESEncrypt)(password),
        });
        return await this.findOne({ userId }, this.userRepo.manager);
    }
    async updateJournalReminderDate(userId) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
                const lastJournalEntry = await entityManager.query("select (now() AT TIME ZONE 'Asia/Manila'::text) + interval '1 hour' as timestamp").then(res => {
                    return res[0]['timestamp'];
                });
                let user = await entityManager.findOneBy(Users_1.Users, {
                    userId,
                });
                user.lastJournalEntry = lastJournalEntry;
                user = await entityManager.save(Users_1.Users, user);
                return await this._sanitizeUser(user);
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    async updatePetCompanion(dto) {
        try {
            return await this.userRepo.manager.transaction(async (entityManager) => {
                const { userId, petCompanionId } = dto;
                let user = await entityManager.findOneBy(Users_1.Users, {
                    userId,
                });
                user.petCompanion = await entityManager.findOneBy(PetCompanion_1.PetCompanion, {
                    petCompanionId
                });
                user = await entityManager.save(Users_1.Users, user);
                return await this._sanitizeUser(user);
            });
        }
        catch (ex) {
            throw ex;
        }
    }
    _sanitizeUser(user) {
        delete user.password;
        delete user.currentHashedRefreshToken;
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(1, (0, typeorm_1.InjectRepository)(Users_1.Users)),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map