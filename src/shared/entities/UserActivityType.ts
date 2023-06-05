import { Column, Entity, Index, OneToMany } from "typeorm";
import { UserActivityLog } from "./UserActivityLog";

@Index("UserActivityType_pkey", ["userActivityTypeId"], { unique: true })
@Entity("UserActivityType", { schema: "dbo" })
export class UserActivityType {
  @Column("bigint", { primary: true, name: "UserActivityTypeId" })
  userActivityTypeId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @OneToMany(
    () => UserActivityLog,
    (userActivityLog) => userActivityLog.userActivityType
  )
  userActivityLogs: UserActivityLog[];
}
