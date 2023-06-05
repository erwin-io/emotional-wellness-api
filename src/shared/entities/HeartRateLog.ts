import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Users } from "./Users";
import { JournalEntry } from "./JournalEntry";

@Index("HeartRateLog_pkey", ["heartRateLogId"], { unique: true })
@Entity("HeartRateLog", { schema: "dbo" })
export class HeartRateLog {
  @PrimaryGeneratedColumn({ type: "bigint", name: "HeartRateLogId" })
  heartRateLogId: string;

  @Column("timestamp without time zone", { name: "Timestamp" })
  timestamp: Date;

  @Column("character varying", { name: "Value" })
  value: string;

  @ManyToOne(() => Users, (users) => users.heartRateLogs)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;

  @OneToMany(() => JournalEntry, (journalEntry) => journalEntry.heartRateLog)
  journalEntries: JournalEntry[];
}
