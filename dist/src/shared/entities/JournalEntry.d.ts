import { EntityStatus } from "./EntityStatus";
import { HeartRateLog } from "./HeartRateLog";
import { MoodEntity } from "./MoodEntity";
import { Users } from "./Users";
export declare class JournalEntry {
    journalEntryId: string;
    notes: string;
    timestamp: Date;
    entityStatus: EntityStatus;
    heartRateLog: HeartRateLog;
    moodEntity: MoodEntity;
    user: Users;
}
