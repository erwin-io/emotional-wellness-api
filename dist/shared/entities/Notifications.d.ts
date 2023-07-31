import { EntityStatus } from "./EntityStatus";
import { Users } from "./Users";
import { NotificationType } from "./NotificationType";
export declare class Notifications {
    notificationId: string;
    date: Date;
    title: string;
    description: string;
    isRead: boolean;
    entityStatus: EntityStatus;
    user: Users;
    notificationType: NotificationType;
}
