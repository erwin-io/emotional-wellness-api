import { CreateJournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.create.dto';
import { JournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.update.dto';
import { JournalEntry } from 'src/shared/entities/JournalEntry';
import { JournalEntryActivity } from 'src/shared/entities/JournalEntryActivity';
import { Repository } from 'typeorm';
import { HeartRateLogService } from './heart-rate-log.service';
import { UsersService } from './users.service';
export declare class JournalEntryService {
    private readonly journalEntryRepo;
    private readonly journalEntryActivityRepo;
    private heartRateLogService;
    private usersService;
    constructor(journalEntryRepo: Repository<JournalEntry>, journalEntryActivityRepo: Repository<JournalEntryActivity>, heartRateLogService: HeartRateLogService, usersService: UsersService);
    findByDate(userId: string, dateFrom: Date, dateTo: Date): Promise<JournalEntry[]>;
    getDateSummary(userId: string, date: Date): Promise<{
        moodPercent: number;
        heartRatePercentage: number;
        heartRateScore: number;
        heartRateStatus: string;
        timestamp: Date;
        heartRate: string;
        lastHeartRateLogId: string;
        moodEntityId: string;
        name: string;
        journalEntries: JournalEntry[];
    }>;
    getWeeklySummary(userId: string, date: Date): Promise<{
        moodPercent: number;
        moodEntityId: string;
        name: string;
        journalEntries: JournalEntry[];
        result: ({
            moodPercent: number;
            moodEntityId: string;
            count: number;
        } | {
            moodPercent: number;
            moodEntityId: string;
            count: number;
        } | {
            moodPercent: number;
            moodEntityId: string;
            count: number;
        } | {
            moodPercent: number;
            moodEntityId: string;
            count: number;
        } | {
            moodPercent: number;
            moodEntityId: string;
            count: number;
        })[];
    }>;
    getWeekly(userId: string, date: Date): Promise<any[]>;
    findOne(options?: any): Promise<JournalEntry>;
    findById(journalEntryId: string): Promise<JournalEntry>;
    add(userId: any, createJournalEntryDto: CreateJournalEntryDto): Promise<JournalEntry>;
    update(dto: JournalEntryDto): Promise<JournalEntry>;
    delete(journalEntryId: string): Promise<JournalEntry>;
}
