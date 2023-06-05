import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ActivityType } from "./ActivityType";

@Entity("JournalEntryActivity", { schema: "dbo" })
export class JournalEntryActivity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "JournalEntryActivityId" })
  journalEntryActivityId: string;

  @Column("bigint", { name: "JournalEntryId" })
  journalEntryId: string;

  @ManyToOne(
    () => ActivityType,
    (activityType) => activityType.journalEntryActivities
  )
  @JoinColumn([
    { name: "ActivityTypeId", referencedColumnName: "activityTypeId" },
  ])
  activityType: ActivityType;
}
