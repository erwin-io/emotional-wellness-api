import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { NotificationService } from "src/services/notification.service";
import { NotificationsDto } from "src/core/dto/notification/notification.dtos";
export declare class NotificationController {
    private readonly notificationService;
    constructor(notificationService: NotificationService);
    getAllByUserIdPage(userId?: string, page?: number, limit?: number): Promise<CustomResponse>;
    getTotalUnreadByUserId(userId?: string): Promise<CustomResponse>;
    updateReadStatus(dto: NotificationsDto): Promise<CustomResponse>;
}
