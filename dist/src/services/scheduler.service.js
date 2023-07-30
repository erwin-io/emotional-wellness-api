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
exports.SchedulerService = void 0;
const common_1 = require("@nestjs/common");
const firebase_provider_1 = require("../core/provider/firebase/firebase-provider");
const notification_service_1 = require("./notification.service");
const users_service_1 = require("./users.service");
const system_config_service_1 = require("./system-config.service");
const notification_type_enum_1 = require("../common/enums/notification-type.enum");
let SchedulerService = class SchedulerService {
    constructor(firebaseProvoder, usersService, notificationService, systemConfigService) {
        this.firebaseProvoder = firebaseProvoder;
        this.usersService = usersService;
        this.notificationService = notificationService;
        this.systemConfigService = systemConfigService;
    }
    async runReminder() {
        const getInterval = await this.systemConfigService.getByKey("JOURNAL_OUTDATED_INTERVAL");
        const getTitle = await this.systemConfigService.getByKey("JOURNAL_OUTDATED_REMINDER_TITLE");
        const getDescription = await this.systemConfigService.getByKey("JOURNAL_OUTDATED_REMINDER_DESC");
        const getUserOutdatedJournal = await this.usersService.getUserOutdatedJournal(Number(getInterval.value));
        getUserOutdatedJournal.forEach(async (x) => {
            const res = await this.firebaseSendToDevice(x.firebaseToken, getTitle.value, getDescription.value);
            console.log(res);
            const notifRes = await this.notificationService.addReminderNotification(x.userId, getTitle.value, getDescription.value, notification_type_enum_1.NotificationTypeEnum.JOURNAL_ENTRY);
            if (!notifRes || notifRes === undefined) {
                throw new common_1.HttpException("Error adding Notification", common_1.HttpStatus.NOT_FOUND);
            }
            const user = await this.usersService.updateJournalReminderDate(x.userId);
            if (!user || user === undefined) {
                throw new common_1.HttpException("Error updating user journal reminder date", common_1.HttpStatus.NOT_FOUND);
            }
        });
    }
    async firebaseSendToDevice(token, title, description) {
        return await this.firebaseProvoder.app
            .messaging()
            .sendToDevice(token, {
            notification: {
                title: title,
                body: description,
                sound: "notif_alert",
            },
        }, {
            priority: "high",
            timeToLive: 60 * 24,
            android: { sound: "notif_alert" },
        })
            .then((response) => {
            console.log("Successfully sent message:", response);
        })
            .catch((error) => {
            throw new common_1.HttpException(`Error sending notif! ${error.message}`, common_1.HttpStatus.BAD_REQUEST);
        });
    }
};
SchedulerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [firebase_provider_1.FirebaseProvider,
        users_service_1.UsersService,
        notification_service_1.NotificationService,
        system_config_service_1.SystemConfigService])
], SchedulerService);
exports.SchedulerService = SchedulerService;
//# sourceMappingURL=scheduler.service.js.map