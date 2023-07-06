import { Users } from "src/shared/entities/Users";
import { EntityStatusViewModel } from "./entity-status.view-model";
import { GenderViewModel } from "./gender.view-model";
import { FilesViewModel } from "./file.view.mode";

export class UserViewModel {
  userId: string;
  name: string;
  mobileNumber: string;
  gender: GenderViewModel;
  birthDate: string;
  age: string;
  entityStatus: EntityStatusViewModel;
  userProfilePic: UserProfilePicViewModel;
  petCompanion: PetCompanionViewModel;
  constructor(model: Users | undefined){
    if (!model || model === null) {
      return null;
    }
    this.userId = model.userId;
    this.name = model.name;
    this.mobileNumber = model.mobileNumber;
    this.gender = model.gender;
    this.birthDate = model.birthDate;
    this.age = model.age;
    this.entityStatus = model.entityStatus;
    this.userProfilePic = model.userProfilePic;
    this.petCompanion = model.petCompanion;
  }
}
export class UserProfilePicViewModel {
  userId: string;
  file: FilesViewModel;
  user: UserViewModel;
}

export class PetCompanionViewModel {
  petCompanionId: string;
  name: string;
}
