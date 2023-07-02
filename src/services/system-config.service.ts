/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SystemConfigDto } from 'src/core/dto/system-config/system-config.update.dto';
import { SystemConfig } from 'src/shared/entities/SystemConfig';
import { Repository } from 'typeorm';

@Injectable()
export class SystemConfigService {
    constructor(@InjectRepository(SystemConfig)private readonly systemConfigRepo: Repository<SystemConfig>) {}

    async getAll() {
        return await this.systemConfigRepo.find();
    }

    async getByKey(key: string) {
        return await this.systemConfigRepo.findOneBy({ key});
    }
  
    async update(dto: SystemConfigDto) {
        const { key, value } = dto;
        return await this.systemConfigRepo.manager.transaction(
          async (entityManager) => {
              let systemConfig = await entityManager.findOneBy(SystemConfig, {
                key
              });
              if(!systemConfig) {
                throw new HttpException("System config key not found", HttpStatus.NOT_FOUND);
              }
              systemConfig.value = value;
              return await entityManager.save(SystemConfig, systemConfig)
          }
        );
      }
}
