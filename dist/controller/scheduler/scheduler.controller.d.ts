import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { SchedulerService } from "src/services/scheduler.service";
export declare class SchedulerController {
    private readonly schedulerService;
    constructor(schedulerService: SchedulerService);
    runReminder(): Promise<CustomResponse>;
}
