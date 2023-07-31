import { JournalEntry } from "./JournalEntry";
import { Notifications } from "./Notifications";
import { Users } from "./Users";
export declare class EntityStatus {
    entityStatusId: string;
    name: string;
    journalEntries: JournalEntry[];
    notifications: Notifications[];
    users: Users[];
}
