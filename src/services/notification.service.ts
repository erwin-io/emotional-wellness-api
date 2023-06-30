/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Notifications } from "src/shared/entities/Notifications";
import { Repository } from "typeorm";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { NotificationTypeEnum } from "src/common/enums/notification-type.enum";
import { NotificationType } from "src/shared/entities/NotificationType";

@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(Notifications)
    private readonly notificationsRepo: Repository<Notifications>
  ) {}
  async getAllByPeopleIdPage(peopleId: string, options: IPaginationOptions) {
    const queryBuilder = this.notificationsRepo.manager
      .createQueryBuilder()
      .select("n")
      .from(Notifications, "n")
      .leftJoinAndSelect("n.reservation", "r")
      .leftJoinAndSelect("r.reservationStatus", "rs")
      .leftJoinAndSelect("r.reservationLevel", "rl")
      .leftJoinAndSelect("n.people", "p")
      .where("p.peopleId = :peopleId", { peopleId });
    queryBuilder.orderBy("n.notificationId", "DESC"); // Or whatever you need to do

    return paginate<Notifications>(queryBuilder, options);
  }

  async updateReadStatus(dto) {
    try {
      return await this.notificationsRepo.manager.transaction(
        async (entityManager) => {
          const notification = await entityManager.findOne(Notifications, {
            where: { notificationId: dto.notificationId },
            relations: ["people"],
          });
          if (!notification) {
            throw new HttpException(
              "Notification not found",
              HttpStatus.NOT_FOUND
            );
          }
          notification.isRead = true;
          await entityManager.save(notification);

          const isRead = false;
          const queryBuilder = entityManager
            .createQueryBuilder()
            .select("n")
            .from(Notifications, "n")
            .leftJoinAndSelect("n.reservation", "r")
            .leftJoinAndSelect("n.user", "u")
            .where("u.userId = :userId", {
              userId: notification.userId,
            })
            .andWhere("n.isRead = :isRead", { isRead });
          return { total: await queryBuilder.getCount() };
        }
      );
    } catch (e) {
      throw e;
    }
  }

  async getTotalUnreadByUserId(userId: string) {
    const isRead = false;
    const queryBuilder = this.notificationsRepo.manager
      .createQueryBuilder()
      .select("n")
      .from(Notifications, "n")
      .leftJoinAndSelect("n.reservation", "r")
      .leftJoinAndSelect("n.user", "u")
      .where("u.userId = :userId", { userId })
      .andWhere("n.isRead = :isRead", { isRead });
    return { total: await queryBuilder.getCount() };
  }
  
  async addReminderNotification(userId: string, title: string, description: string, notificationTypeId: NotificationTypeEnum) {
    return await this.notificationsRepo.manager.transaction(
      async (entityManager) => {
        let notification = new Notifications();
        notification.userId = userId;
        notification.title = title;
        notification.description = description;
        notification.notificationType = await entityManager.findOneBy(NotificationType, {
          notificationTypeId: notificationTypeId.toString()
        });
        notification = await entityManager.save(Notifications, notification);
        return notification;
      }
    );
  }
}
