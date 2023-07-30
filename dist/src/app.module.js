"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_service_1 = require("./app.service");
const users_module_1 = require("./controller/users/users.module");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_service_1 = require("./shared/typeorm/typeorm.service");
const env_helper_1 = require("./common/helper/env.helper");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./controller/auth/auth.module");
const file_module_1 = require("./controller/file/file.module");
const dashboard_module_1 = require("./controller/dashboard/dashboard.module");
const firebase_provider_module_1 = require("./core/provider/firebase/firebase-provider.module");
const Joi = require("@hapi/joi");
const user_activity_log_module_1 = require("./controller/user-activity-log/user-activity-log.module");
const journal_entry_module_1 = require("./controller/journal-entry/journal-entry.module");
const heart_rate_log_module_1 = require("./controller/heart-rate-log/heart-rate-log.module");
const mood_sentiment_module_1 = require("./controller/mood-sentiment/mood-sentiment.module");
const system_config_module_1 = require("./controller/system-config/system-config.module");
const scheduler_module_1 = require("./controller/scheduler/scheduler.module");
const envFilePath = (0, env_helper_1.getEnvPath)(`${__dirname}/common/envs`);
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                envFilePath,
                isGlobal: true,
                validationSchema: Joi.object({
                    UPLOADED_FILES_DESTINATION: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigService }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            file_module_1.FileModule,
            dashboard_module_1.DashboardModule,
            firebase_provider_module_1.FirebaseProviderModule,
            user_activity_log_module_1.UserActivityLogModule,
            journal_entry_module_1.JournalEntryModule,
            heart_rate_log_module_1.HeartRateLogModule,
            mood_sentiment_module_1.MoodSentimentModule,
            system_config_module_1.SystemConfigModule,
            scheduler_module_1.SchedulerModule,
        ],
        providers: [app_service_1.AppService],
        controllers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map