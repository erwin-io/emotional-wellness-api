/* eslint-disable prettier/prettier */
import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import {
  MessagingDevicesResponse,
  NotificationMessagePayload,
} from "firebase-admin/lib/messaging/messaging-api";
import * as moment from "moment";
import {
  NotificationTitleConstant,
  NotificationDescriptionConstant,
} from "src/common/constant/notifications.constant";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Notifications } from "src/shared/entities/Notifications";
import { NotificationService } from "./notification.service";
import { UsersService } from "./users.service";
import { SystemConfigService } from "./system-config.service";
import { NotificationTypeEnum } from "src/common/enums/notification-type.enum";

@Injectable()
export class SchedulerService {
  constructor(
    private firebaseProvoder: FirebaseProvider,
    private usersService: UsersService,
    private notificationService: NotificationService,
    private systemConfigService: SystemConfigService
  ) {}

  async runReminder() {
    // const today = new Date();

    const getInterval = await this.systemConfigService.getByKey(
      "JOURNAL_OUTDATED_INTERVAL"
    );
    const getTitle = await this.systemConfigService.getByKey(
      "JOURNAL_OUTDATED_REMINDER_TITLE"
    );
    const getDescription = await this.systemConfigService.getByKey(
      "JOURNAL_OUTDATED_REMINDER_DESC"
    );
    const getUserOutdatedJournal =
      await this.usersService.getUserOutdatedJournal(Number(getInterval.value));

    getUserOutdatedJournal.forEach(async (x) => {
      const res = await this.firebaseSendToDevice(
        x.firebaseToken,
        getTitle.value,
        getDescription.value
      );
      console.log(res);

      const notifRes = await this.notificationService.addReminderNotification(x.userId, getTitle.value, getDescription.value, NotificationTypeEnum.JOURNAL_ENTRY);
      if(!notifRes || notifRes === undefined) {
        throw new HttpException(
          "Error adding Notification",
          HttpStatus.NOT_FOUND
        );
      }

      const user = await this.usersService.updateJournalReminderDate(x.userId);      
      if(!user || user === undefined) {
        throw new HttpException(
          "Error updating user journal reminder date",
          HttpStatus.NOT_FOUND
        );
      }
    });

  }

  async firebaseSendToDevice(token, title, description) {
    return await this.firebaseProvoder.app
      .messaging()
      .sendToDevice(
        token,
        {
          notification: {
            title: title,
            body: description,
            sound: "notif_alert",
          },
        },
        {
          priority: "high",
          timeToLive: 60 * 24,
          android: { sound: "notif_alert" },
        }
      )
      .then((response: MessagingDevicesResponse) => {
        console.log("Successfully sent message:", response);
      })
      .catch((error) => {
        throw new HttpException(
          `Error sending notif! ${error.message}`,
          HttpStatus.BAD_REQUEST
        );
      });
  }
}
