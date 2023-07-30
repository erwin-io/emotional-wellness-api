import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { UserActivityLogService } from "src/services/user-activity-log.service";
export declare class UserActivityLogController {
    private readonly userActivityLogService;
    constructor(userActivityLogService: UserActivityLogService);
    getUserLogActivity(userTypeId?: number, activityTypeId?: string, name?: string, dateFrom?: Date, dateTo?: Date): Promise<CustomResponse>;
}
