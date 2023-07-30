import { CreateHeartRateLogDto } from 'src/core/dto/heart-rate-log/heart-rate-log.create.dto';
import { HeartRateLog } from 'src/shared/entities/HeartRateLog';
import { Repository } from 'typeorm';
export declare class HeartRateLogService {
    private readonly heartRateLogRepo;
    constructor(heartRateLogRepo: Repository<HeartRateLog>);
    getHeartRateStatus(userId: string, value: number): Promise<{
        heartRatePercentage: number;
        heartRateScore: number;
        heartRateStatus: string;
    }>;
    findByDate(userId: string, dateFrom: Date, dateTo: Date): Promise<HeartRateLog[]>;
    findOne(options?: any): Promise<HeartRateLog>;
    findById(heartRateLogId: string): Promise<HeartRateLog>;
    add(userId: any, createHeartRateLogDto: CreateHeartRateLogDto): Promise<HeartRateLog>;
}
