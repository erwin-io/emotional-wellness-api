import { Users } from "src/shared/entities/Users";
import { EntityStatusViewModel } from "./entity-status.view-model";
import { GenderViewModel } from "./gender.view-model";
import { FilesViewModel } from "./file.view.mode";
export declare class UserViewModel {
    userId: string;
    name: string;
    mobileNumber: string;
    gender: GenderViewModel;
    birthDate: string;
    age: string;
    entityStatus: EntityStatusViewModel;
    userProfilePic: UserProfilePicViewModel;
    petCompanion: PetCompanionViewModel;
    constructor(model: Users | undefined);
}
export declare class UserProfilePicViewModel {
    userId: string;
    file: FilesViewModel;
    user: UserViewModel;
}
export declare class PetCompanionViewModel {
    petCompanionId: string;
    name: string;
}
