import { Column, Entity, Index, OneToMany } from "typeorm";
import { Notifications } from "./Notifications";

@Index("NotificationType_pkey", ["notificationTypeId"], { unique: true })
@Entity("NotificationType", { schema: "dbo" })
export class NotificationType {
  @Column("bigint", { primary: true, name: "NotificationTypeId" })
  notificationTypeId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @OneToMany(
    () => Notifications,
    (notifications) => notifications.notificationType
  )
  notifications: Notifications[];
}
