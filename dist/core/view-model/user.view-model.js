"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PetCompanionViewModel = exports.UserProfilePicViewModel = exports.UserViewModel = void 0;
class UserViewModel {
    constructor(model) {
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
exports.UserViewModel = UserViewModel;
class UserProfilePicViewModel {
}
exports.UserProfilePicViewModel = UserProfilePicViewModel;
class PetCompanionViewModel {
}
exports.PetCompanionViewModel = PetCompanionViewModel;
//# sourceMappingURL=user.view-model.js.map