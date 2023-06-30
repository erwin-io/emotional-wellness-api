import { Column, Entity, Index, OneToMany } from "typeorm";
import { JournalEntry } from "./JournalEntry";
import { Notifications } from "./Notifications";
import { Users } from "./Users";

@Index("pk_entitystatus_869578136", ["entityStatusId"], { unique: true })
@Entity("EntityStatus", { schema: "dbo" })
export class EntityStatus {
  @Column("bigint", { primary: true, name: "EntityStatusId" })
  entityStatusId: string;

  @Column("character varying", { name: "Name", length: 100 })
  name: string;

  @OneToMany(() => JournalEntry, (journalEntry) => journalEntry.entityStatus)
  journalEntries: JournalEntry[];

  @OneToMany(() => Notifications, (notifications) => notifications.entityStatus)
  notifications: Notifications[];

  @OneToMany(() => Users, (users) => users.entityStatus)
  users: Users[];
}
