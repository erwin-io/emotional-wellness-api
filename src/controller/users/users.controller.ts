import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
} from "@nestjs/common";
import { UsersService } from "../../services/users.service";
import { CustomResponse } from "./../../common/helper/customresponse.helpers";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { JwtAuthGuard } from "../../core/auth/jwt.auth.guard";
import { ChangePasswordDto } from "src/core/dto/users/change-password.dto";
import { FileInterceptor, FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { extname } from "path";
import { unlinkSync } from "fs";
import { UpdateFirebaseToken, UpdatePasswordDto, UpdateProfilePictureDto, UpdateUserDto } from "src/core/dto/users/user.update.dto";

@ApiTags("users")
@Controller("users")
@ApiBearerAuth("jwt")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@Param("id") userId: string) {
    const res: CustomResponse = {};
    try {
      res.data = await this.userService.findById(userId);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("")
  @UseGuards(JwtAuthGuard)
  async updateUser(@Body() userDto: UpdateUserDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.userService.updateUser(userDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateProfilePicture")
  @UseGuards(JwtAuthGuard)
  async updateProfilePicture(@Body() dto: UpdateProfilePictureDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.userService.updateProfilePicture(dto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/changePassword")
  @UseGuards(JwtAuthGuard)
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.userService.changePassword(
        changePasswordDto.userId,
        changePasswordDto.currentPassword,
        changePasswordDto.newPassword
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/udpdatePassword")
  @UseGuards(JwtAuthGuard)
  async udpdatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.userService.updatePassword(
        updatePasswordDto.userId,
        updatePasswordDto.password
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/updateFirebaseToken")
  @UseGuards(JwtAuthGuard)
  async updateFirebaseToken(@Body() updateFirebaseToken: UpdateFirebaseToken) {
    const res: CustomResponse = {};
    try {
      const res: CustomResponse = {};
      res.data = await this.userService.updateFirebaseToken(
        updateFirebaseToken.userId,
        updateFirebaseToken.firebaseToken
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
