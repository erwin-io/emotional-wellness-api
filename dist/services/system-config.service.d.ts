import { SystemConfigDto } from 'src/core/dto/system-config/system-config.update.dto';
import { SystemConfig } from 'src/shared/entities/SystemConfig';
import { Repository } from 'typeorm';
export declare class SystemConfigService {
    private readonly systemConfigRepo;
    constructor(systemConfigRepo: Repository<SystemConfig>);
    getAll(): Promise<SystemConfig[]>;
    getByKey(key: string): Promise<SystemConfig>;
    update(dto: SystemConfigDto): Promise<SystemConfig>;
}
