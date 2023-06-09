import { UserDto } from "../../core/dto/users/user.update.dto";
import { LocalAuthGuard } from "../../core/auth/local.auth.guard";
import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Headers,
  Query,
} from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto } from "../../core/dto/users/user-login.dto";
import { JwtPayload } from "../../core/interfaces/payload.interface";
import { ApiBearerAuth, ApiQuery, ApiTags } from "@nestjs/swagger";
import { CustomResponse } from "../../common/helper/customresponse.helpers";
import { JwtAuthGuard } from "../../core/auth/jwt.auth.guard";
import { GetUser } from "../../common/decorator/get-user.decorator";
import { RefreshTokenDto } from "../../core/dto/auth/refresh-token.dto";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";
import { AESDecrypt, AESEncrypt } from "src/common/utils/utils";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register")
  public async register(@Body() createUserDto: CreateUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.register(createUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login")
  public async login(@Body() loginUserDto: LoginUserDto) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.login(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/findByMobileNumber/:mobileNumber")
  async findByMobileNumber(@Param("mobileNumber") mobileNumber: string) {
    const res: CustomResponse = {};
    try {
      res.data = await this.authService.findByMobileNumber(mobileNumber);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @ApiBearerAuth("jwt")
  @Post("/logout")
  @UseGuards(JwtAuthGuard)
  public async logout(@GetUser() user: UserDto, @Headers() headers) {
    const res: CustomResponse = {};
    try {
      this.authService.logOut(user.userId, headers);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @ApiBearerAuth("jwt")
  @Get("whoami")
  @UseGuards(LocalAuthGuard)
  public async testAuth(@Req() req: any): Promise<JwtPayload> {
    return req.user;
  }

  @Post("/refresh-token")
  async refreshToken(@Body() token: RefreshTokenDto) {
    const result = await this.authService.getUserIfRefreshTokenMatches(
      token.refresh_token,
      token.userId
    );
    if (result) {
      return this.authService.getNewAccessAndRefreshToken(result.userId);
    } else {
      return null;
    }
  }
}
