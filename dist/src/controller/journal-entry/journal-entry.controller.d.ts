import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { CreateJournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.create.dto';
import { JournalEntryDto } from 'src/core/dto/journal-entry/journal-entry.update.dto';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { JournalEntryService } from 'src/services/journal-entry.service';
export declare class JournalEntryController {
    private readonly journalEntryService;
    constructor(journalEntryService: JournalEntryService);
    findByDate(dateFrom: Date, dateTo: Date, user: UserDto): Promise<CustomResponse>;
    getDateSummary(date: Date, user: UserDto): Promise<CustomResponse>;
    getWeeklySummary(date: Date, user: UserDto): Promise<CustomResponse>;
    getWeekly(date: Date, user: UserDto): Promise<CustomResponse>;
    findOne(journalEntryId: string): Promise<CustomResponse>;
    create(createJournalEntryDto: CreateJournalEntryDto, user: UserDto): Promise<CustomResponse>;
    update(dto: JournalEntryDto): Promise<CustomResponse>;
    delete(journalEntryId: string): Promise<CustomResponse>;
}
