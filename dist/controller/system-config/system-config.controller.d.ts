import { CustomResponse } from "src/common/helper/customresponse.helpers";
import { SystemConfigDto } from "src/core/dto/system-config/system-config.update.dto";
import { SystemConfigService } from "src/services/system-config.service";
export declare class SystemConfigController {
    private readonly systemConfigService;
    constructor(systemConfigService: SystemConfigService);
    findAll(): Promise<CustomResponse>;
    updateUser(dto: SystemConfigDto): Promise<CustomResponse>;
}
