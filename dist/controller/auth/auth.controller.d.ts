import { UserDto } from "../../core/dto/users/user.update.dto";
import { AuthService } from "../../services/auth.service";
import { LoginUserDto } from "../../core/dto/users/user-login.dto";
import { JwtPayload } from "../../core/interfaces/payload.interface";
import { CustomResponse } from "../../common/helper/customresponse.helpers";
import { RefreshTokenDto } from "../../core/dto/auth/refresh-token.dto";
import { CreateUserDto } from "src/core/dto/users/user.create.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(createUserDto: CreateUserDto): Promise<CustomResponse>;
    login(loginUserDto: LoginUserDto): Promise<CustomResponse>;
    findByMobileNumber(mobileNumber: string): Promise<CustomResponse>;
    logout(user: UserDto, headers: any): Promise<CustomResponse>;
    testAuth(req: any): Promise<JwtPayload>;
    refreshToken(token: RefreshTokenDto): Promise<{
        accessToken: any;
        refreshToken: string;
    }>;
}
