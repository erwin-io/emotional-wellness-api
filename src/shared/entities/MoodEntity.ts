import { Column, Entity, Index, OneToMany } from "typeorm";
import { JournalEntry } from "./JournalEntry";

@Index("MoodEntity_pkey", ["moodEntityId"], { unique: true })
@Entity("MoodEntity", { schema: "dbo" })
export class MoodEntity {
  @Column("bigint", { primary: true, name: "MoodEntityId" })
  moodEntityId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @OneToMany(() => JournalEntry, (journalEntry) => journalEntry.moodEntity)
  journalEntries: JournalEntry[];
}
