import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { EntityStatus } from "./EntityStatus";
import { HeartRateLog } from "./HeartRateLog";
import { MoodEntity } from "./MoodEntity";
import { Users } from "./Users";

@Index("JournalEntry_pkey", ["journalEntryId"], { unique: true })
@Entity("JournalEntry", { schema: "dbo" })
export class JournalEntry {
  @PrimaryGeneratedColumn({ type: "bigint", name: "JournalEntryId" })
  journalEntryId: string;

  @Column("character varying", { name: "Notes" })
  notes: string;

  @Column("timestamp with time zone", { name: "Timestamp" })
  timestamp: Date;

  @ManyToOne(() => EntityStatus, (entityStatus) => entityStatus.journalEntries)
  @JoinColumn([
    { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
  ])
  entityStatus: EntityStatus;

  @ManyToOne(() => HeartRateLog, (heartRateLog) => heartRateLog.journalEntries)
  @JoinColumn([
    { name: "HeartRateLogId", referencedColumnName: "heartRateLogId" },
  ])
  heartRateLog: HeartRateLog;

  @ManyToOne(() => MoodEntity, (moodEntity) => moodEntity.journalEntries)
  @JoinColumn([{ name: "MoodEntityId", referencedColumnName: "moodEntityId" }])
  moodEntity: MoodEntity;

  @ManyToOne(() => Users, (users) => users.journalEntries)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;
}
