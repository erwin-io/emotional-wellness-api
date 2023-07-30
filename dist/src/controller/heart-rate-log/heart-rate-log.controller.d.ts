import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { CreateHeartRateLogDto } from 'src/core/dto/heart-rate-log/heart-rate-log.create.dto';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { HeartRateLogService } from 'src/services/heart-rate-log.service';
export declare class HeartRateLogController {
    private readonly heartRateLogService;
    constructor(heartRateLogService: HeartRateLogService);
    findByDate(dateFrom: Date, dateTo: Date, user: UserDto): Promise<CustomResponse>;
    getHeartRateStatus(user: UserDto, value?: number): Promise<CustomResponse>;
    findOne(heartRateLogId: string): Promise<CustomResponse>;
    create(createHeartRateLogDto: CreateHeartRateLogDto, user: UserDto): Promise<CustomResponse>;
}
