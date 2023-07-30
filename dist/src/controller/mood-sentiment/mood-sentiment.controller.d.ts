import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { MoodSentimentService } from 'src/services/mood-sentiment.service';
export declare class MoodSentimentController {
    private readonly moodSentimentService;
    constructor(moodSentimentService: MoodSentimentService);
    findByDate(text: string, user: UserDto): Promise<CustomResponse>;
}
