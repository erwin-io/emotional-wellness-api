import { HttpService } from "@nestjs/axios";
export declare class MoodSentimentService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getSentimentAnalysis(text: string): Promise<{
        moodEntityId: any;
        name: any;
    }>;
    private translateToEnglish;
}
