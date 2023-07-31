export declare class UserDto {
    userId: string;
}
export declare class UserProfilePicDto {
    fileName: string;
    data: string;
}
export declare class UpdateUserDto extends UserDto {
    name: string;
    birthDate: Date;
    genderId: string;
    userProfilePic: UserProfilePicDto;
}
export declare class UpdatePasswordDto extends UserDto {
    password: string;
}
export declare class UpdateFirebaseToken extends UserDto {
    firebaseToken: string;
}
export declare class UpdateProfilePictureDto extends UserDto {
    userProfilePic: any;
}
export declare class UpdatePetCompanionDto extends UserDto {
    petCompanionId: string;
}
