import { Response } from "express";
import { UpdateProfilePictureDto } from "src/core/dto/users/user.update.dto";
export declare class FileDto {
    fileName: string;
}
export declare class FileController {
    constructor();
    getFile(fileName: string, res: Response): Promise<void>;
    upload(dto: UpdateProfilePictureDto, res: Response): Promise<void>;
}
