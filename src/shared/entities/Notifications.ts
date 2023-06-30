import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntityStatus } from "./EntityStatus";
import { NotificationType } from "./NotificationType";

@Index("pk_notifications_1061578820", ["notificationId"], { unique: true })
@Entity("Notifications", { schema: "dbo" })
export class Notifications {
  @PrimaryGeneratedColumn({ type: "bigint", name: "NotificationId" })
  notificationId: string;

  @Column("timestamp with time zone", {
    name: "Date",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  date: Date;

  @Column("bigint", { name: "UserId" })
  userId: string;

  @Column("character varying", { name: "Title" })
  title: string;

  @Column("character varying", { name: "Description" })
  description: string;

  @Column("boolean", { name: "IsRead", default: () => "false" })
  isRead: boolean;

  @ManyToOne(() => EntityStatus, (entityStatus) => entityStatus.notifications)
  @JoinColumn([
    { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
  ])
  entityStatus: EntityStatus;

  @ManyToOne(
    () => NotificationType,
    (notificationType) => notificationType.notifications
  )
  @JoinColumn([
    { name: "NotificationTypeId", referencedColumnName: "notificationTypeId" },
  ])
  notificationType: NotificationType;
}
