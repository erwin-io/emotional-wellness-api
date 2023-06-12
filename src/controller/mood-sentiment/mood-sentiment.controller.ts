import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { JwtAuthGuard } from 'src/core/auth/jwt.auth.guard';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { MoodSentimentService } from 'src/services/mood-sentiment.service';

@ApiTags("mood-sentiment")
@Controller("mood-sentiment")
@ApiBearerAuth("jwt")
export class MoodSentimentController {
    constructor(private readonly moodSentimentService: MoodSentimentService) {}

    @Get("getSentimentAnalysis")
    @ApiQuery({ name: "text", required: true })
    @UseGuards(JwtAuthGuard)
    async findByDate(
        // eslint-disable-next-line @typescript-eslint/no-inferrable-types
        @Query("text") text = "",
        @GetUser() user: UserDto
    ) {
        const res: CustomResponse = {};
        try {
        res.data = await this.moodSentimentService.getSentimentAnalysis(text);
        res.success = true;
        return res;
        } catch (e) {
        res.success = false;
        res.message = e.message !== undefined ? e.message : e;
        return res;
        }
    }
    
}
