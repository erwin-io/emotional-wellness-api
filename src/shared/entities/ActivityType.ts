import { Column, Entity, Index, OneToMany } from "typeorm";
import { JournalEntryActivity } from "./JournalEntryActivity";

@Index("ActivityType_pkey1", ["activityTypeId"], { unique: true })
@Entity("ActivityType", { schema: "dbo" })
export class ActivityType {
  @Column("bigint", { primary: true, name: "ActivityTypeId" })
  activityTypeId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @OneToMany(
    () => JournalEntryActivity,
    (journalEntryActivity) => journalEntryActivity.activityType
  )
  journalEntryActivities: JournalEntryActivity[];
}
