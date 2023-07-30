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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Notifications_1 = require("../shared/entities/Notifications");
const typeorm_2 = require("typeorm");
const nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
const NotificationType_1 = require("../shared/entities/NotificationType");
const Users_1 = require("../shared/entities/Users");
let NotificationService = class NotificationService {
    constructor(notificationsRepo) {
        this.notificationsRepo = notificationsRepo;
    }
    async getAllByUserIdPage(userId, options) {
        const queryBuilder = this.notificationsRepo.manager
            .createQueryBuilder()
            .select("n")
            .from(Notifications_1.Notifications, "n")
            .leftJoinAndSelect("n.notificationType", "nt")
            .leftJoinAndSelect("n.user", "u")
            .where("u.userId = :userId", { userId });
        queryBuilder.orderBy("n.notificationId", "DESC");
        return (0, nestjs_typeorm_paginate_1.paginate)(queryBuilder, options);
    }
    async updateReadStatus(dto) {
        try {
            return await this.notificationsRepo.manager.transaction(async (entityManager) => {
                const notification = await entityManager.findOne(Notifications_1.Notifications, {
                    where: { notificationId: dto.notificationId },
                    relations: ["user"],
                });
                if (!notification) {
                    throw new common_1.HttpException("Notification not found", common_1.HttpStatus.NOT_FOUND);
                }
                notification.isRead = true;
                await entityManager.save(notification);
                const isRead = false;
                const queryBuilder = entityManager
                    .createQueryBuilder()
                    .select("n")
                    .from(Notifications_1.Notifications, "n")
                    .leftJoinAndSelect("n.notificationType", "nt")
                    .leftJoinAndSelect("n.user", "u")
                    .where("u.userId = :userId", {
                    userId: notification.user.userId,
                })
                    .andWhere("n.isRead = :isRead", { isRead });
                return { total: await queryBuilder.getCount() };
            });
        }
        catch (e) {
            throw e;
        }
    }
    async getTotalUnreadByUserId(userId) {
        const isRead = false;
        const queryBuilder = this.notificationsRepo.manager
            .createQueryBuilder()
            .select("n")
            .from(Notifications_1.Notifications, "n")
            .leftJoinAndSelect("n.notificationType", "nt")
            .leftJoinAndSelect("n.user", "u")
            .where("u.userId = :userId", { userId })
            .andWhere("n.isRead = :isRead", { isRead });
        return { total: await queryBuilder.getCount() };
    }
    async addReminderNotification(userId, title, description, notificationTypeId) {
        return await this.notificationsRepo.manager.transaction(async (entityManager) => {
            let notification = new Notifications_1.Notifications();
            notification.user = await entityManager.findOneBy(Users_1.Users, {
                userId
            });
            notification.title = title;
            notification.description = description;
            notification.notificationType = await entityManager.findOneBy(NotificationType_1.NotificationType, {
                notificationTypeId: notificationTypeId.toString()
            });
            notification = await entityManager.save(Notifications_1.Notifications, notification);
            return notification;
        });
    }
};
NotificationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Notifications_1.Notifications)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map