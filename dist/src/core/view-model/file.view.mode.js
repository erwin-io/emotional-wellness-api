"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilesViewModel = void 0;
class FilesViewModel {
    constructor(model) {
        if (!model || model === null) {
            return null;
        }
        this.fileId = model.fileId;
        this.fileName = model.fileName;
        this.url = model.url;
    }
}
exports.FilesViewModel = FilesViewModel;
//# sourceMappingURL=file.view.mode.js.map