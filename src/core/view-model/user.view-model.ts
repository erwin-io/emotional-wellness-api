import { Users } from "src/shared/entities/Users";
import { EntityStatusViewModel } from "./entity-status.view-model";
import { GenderViewModel } from "./gender.view-model";
import { FilesViewModel } from "./file.view.mode";

export class UserViewModel {
  userId: string;
  username: string;
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  address: string;
  fullName: string;
  gender: GenderViewModel;
  birthDate: string;
  age: string;
  entityStatus: EntityStatusViewModel;
  userProfilePic: UserProfilePicViewModel;
  constructor(model: Users | undefined){
    if (!model || model === null) {
      return null;
    }
    this.userId = model.userId;
    this.username = model.username;
    this.firstName = model.firstName;
    this.middleName = model.middleName;
    this.lastName = model.lastName;
    this.email = model.email;
    this.mobileNumber = model.mobileNumber;
    this.address = model.address;
    this.fullName =
      this.firstName +
      (this.middleName ? " " + this.middleName + " " : " ") +
      this.lastName;
    this.gender = model.gender;
    this.birthDate = model.birthDate;
    this.age = model.age;
    this.entityStatus = model.entityStatus;
  }
}
export class UserProfilePicViewModel {
  userId: string;
  file: FilesViewModel;
  user: UserViewModel;
}