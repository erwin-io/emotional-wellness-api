import { UsersService } from "../../services/users.service";
import { CustomResponse } from "./../../common/helper/customresponse.helpers";
import { ChangePasswordDto } from "src/core/dto/users/change-password.dto";
import { UpdateFirebaseToken, UpdatePasswordDto, UpdatePetCompanionDto, UpdateProfilePictureDto, UpdateUserDto } from "src/core/dto/users/user.update.dto";
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    findOne(userId: string): Promise<CustomResponse>;
    updateUser(userDto: UpdateUserDto): Promise<CustomResponse>;
    updateProfilePicture(dto: UpdateProfilePictureDto): Promise<CustomResponse>;
    changePassword(changePasswordDto: ChangePasswordDto): Promise<CustomResponse>;
    udpdatePassword(updatePasswordDto: UpdatePasswordDto): Promise<CustomResponse>;
    updateFirebaseToken(updateFirebaseToken: UpdateFirebaseToken): Promise<CustomResponse>;
    updatePetCompanion(dto: UpdatePetCompanionDto): Promise<CustomResponse>;
}
