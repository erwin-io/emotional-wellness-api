import { UserActivityLog } from "src/shared/entities/UserActivityLog";
import { EntityManager, Repository } from "typeorm";
import { UsersService } from "./users.service";
export declare class UserActivityLogService {
    private readonly userActivityLogRepo;
    private readonly usersService;
    constructor(userActivityLogRepo: Repository<UserActivityLog>, usersService: UsersService);
    findByFilter(userTypeId: string, userActivityTypeId: string[], name: string, dateFrom: Date, dateTo: Date): Promise<UserActivityLog[]>;
    log(userActivityTypeId: string, userId: string, date: Date, os: string, osVersion: string, browser: string): Promise<UserActivityLog>;
    userLogin(entityManager: EntityManager, userId: string, date: Date, os: string, osVersion: string, browser: string): Promise<UserActivityLog>;
    userLogout(entityManager: EntityManager, userId: string, date: Date, os: string, osVersion: string, browser: string): Promise<UserActivityLog>;
}
