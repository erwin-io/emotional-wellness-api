import { Notifications } from "src/shared/entities/Notifications";
import { Repository } from "typeorm";
import { IPaginationOptions } from "nestjs-typeorm-paginate";
import { NotificationTypeEnum } from "src/common/enums/notification-type.enum";
export declare class NotificationService {
    private readonly notificationsRepo;
    constructor(notificationsRepo: Repository<Notifications>);
    getAllByUserIdPage(userId: string, options: IPaginationOptions): Promise<import("nestjs-typeorm-paginate").Pagination<Notifications, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    updateReadStatus(dto: any): Promise<{
        total: number;
    }>;
    getTotalUnreadByUserId(userId: string): Promise<{
        total: number;
    }>;
    addReminderNotification(userId: string, title: string, description: string, notificationTypeId: NotificationTypeEnum): Promise<Notifications>;
}
