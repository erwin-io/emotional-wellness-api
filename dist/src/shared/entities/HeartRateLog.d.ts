import { Users } from "./Users";
import { JournalEntry } from "./JournalEntry";
export declare class HeartRateLog {
    heartRateLogId: string;
    timestamp: Date;
    value: string;
    user: Users;
    journalEntries: JournalEntry[];
}
