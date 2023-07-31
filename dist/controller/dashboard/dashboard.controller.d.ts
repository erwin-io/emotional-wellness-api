import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { DashboardService } from "src/services/dashboard.service";
export declare class DashboardController {
    private readonly dashboardServiceService;
    constructor(dashboardServiceService: DashboardService);
    get(date: Date): Promise<CustomResponse>;
}
