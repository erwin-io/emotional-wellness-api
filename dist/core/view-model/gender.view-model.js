"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenderViewModel = void 0;
class GenderViewModel {
    constructor(model) {
        if (!model || model === null) {
            return null;
        }
        this.genderId = model.genderId;
        this.name = model.name;
    }
}
exports.GenderViewModel = GenderViewModel;
//# sourceMappingURL=gender.view-model.js.map