import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserActivityType } from "./UserActivityType";
import { Users } from "./Users";

@Index("pk_useractivitylog", ["userActivityLogId"], { unique: true })
@Entity("UserActivityLog", { schema: "dbo" })
export class UserActivityLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserActivityLogId" })
  userActivityLogId: string;

  @Column("timestamp with time zone", { name: "Date" })
  date: Date;

  @Column("character varying", { name: "OS" })
  os: string;

  @Column("character varying", { name: "OSVersion", default: () => "0" })
  osVersion: string;

  @Column("character varying", { name: "Browser" })
  browser: string;

  @ManyToOne(
    () => UserActivityType,
    (userActivityType) => userActivityType.userActivityLogs
  )
  @JoinColumn([
    { name: "UserActivityTypeId", referencedColumnName: "userActivityTypeId" },
  ])
  userActivityType: UserActivityType;

  @ManyToOne(() => Users, (users) => users.userActivityLogs)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;
}
