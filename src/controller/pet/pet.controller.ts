/* eslint-disable prettier/prettier */
import { Body, Controller, Put, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/common/decorator/get-user.decorator';
import { CustomResponse } from 'src/common/helper/customresponse.helpers';
import { JwtAuthGuard } from 'src/core/auth/jwt.auth.guard';
import { PetDto } from 'src/core/dto/pet/pet.dto';
import { PetService } from 'src/services/pet.service';
import { UserDto } from 'src/core/dto/users/user.update.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags("pet")
@Controller("pet")
@ApiBearerAuth("jwt")
export class PetController {
    constructor(private readonly petService: PetService) {}

  @Put("")
  @UseGuards(JwtAuthGuard)
  async update(@Body() dto: PetDto, @GetUser() user: UserDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.petService.update(user.userId, dto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
