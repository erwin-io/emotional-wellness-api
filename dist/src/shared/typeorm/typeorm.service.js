"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeOrmConfigService = void 0;
const EntityStatus_1 = require("../entities/EntityStatus");
const Gender_1 = require("../entities/Gender");
const Users_1 = require("../entities/Users");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const Messages_1 = require("../entities/Messages");
const Notifications_1 = require("../entities/Notifications");
const GatewayConnectedUsers_1 = require("../entities/GatewayConnectedUsers");
const Files_1 = require("../entities/Files");
const UserProfilePic_1 = require("../entities/UserProfilePic");
const UserActivityType_1 = require("../entities/UserActivityType");
const UserActivityLog_1 = require("../entities/UserActivityLog");
const JournalEntry_1 = require("../entities/JournalEntry");
const ActivityType_1 = require("../entities/ActivityType");
const MoodEntity_1 = require("../entities/MoodEntity");
const HeartRateLog_1 = require("../entities/HeartRateLog");
const JournalEntryActivity_1 = require("../entities/JournalEntryActivity");
const SystemConfig_1 = require("../entities/SystemConfig");
const NotificationType_1 = require("../entities/NotificationType");
const PetCompanion_1 = require("../entities/PetCompanion");
let TypeOrmConfigService = class TypeOrmConfigService {
    createTypeOrmOptions() {
        const ssl = this.config.get("SSL");
        let config = {
            type: "postgres",
            host: this.config.get("DATABASE_HOST"),
            port: Number(this.config.get("DATABASE_PORT")),
            database: this.config.get("DATABASE_NAME"),
            username: this.config.get("DATABASE_USER"),
            password: this.config.get("DATABASE_PASSWORD"),
            entities: [
                Users_1.Users,
                Gender_1.Gender,
                EntityStatus_1.EntityStatus,
                Notifications_1.Notifications,
                Messages_1.Messages,
                GatewayConnectedUsers_1.GatewayConnectedUsers,
                Files_1.Files,
                UserProfilePic_1.UserProfilePic,
                UserActivityType_1.UserActivityType,
                UserActivityLog_1.UserActivityLog,
                JournalEntry_1.JournalEntry,
                ActivityType_1.ActivityType,
                MoodEntity_1.MoodEntity,
                JournalEntryActivity_1.JournalEntryActivity,
                HeartRateLog_1.HeartRateLog,
                SystemConfig_1.SystemConfig,
                NotificationType_1.NotificationType,
                PetCompanion_1.PetCompanion
            ],
            synchronize: false,
            ssl: ssl.toLocaleLowerCase().includes("true"),
            extra: {}
        };
        if (config.ssl) {
            config.extra.ssl = {
                require: true,
                rejectUnauthorized: false,
            };
        }
        return config;
    }
};
__decorate([
    (0, common_1.Inject)(config_1.ConfigService),
    __metadata("design:type", config_1.ConfigService)
], TypeOrmConfigService.prototype, "config", void 0);
TypeOrmConfigService = __decorate([
    (0, common_1.Injectable)()
], TypeOrmConfigService);
exports.TypeOrmConfigService = TypeOrmConfigService;
//# sourceMappingURL=typeorm.service.js.map