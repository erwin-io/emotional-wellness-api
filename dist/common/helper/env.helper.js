"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatId = exports.ToBoolean = exports.getEnvPath = void 0;
const class_transformer_1 = require("class-transformer");
const fs_1 = require("fs");
const path_1 = require("path");
function getEnvPath(dest) {
    const env = process.env["NODE" + "_ENV"];
    const fallback = (0, path_1.resolve)(`${dest}/.env`);
    const filename = env ? `${env}.env` : "development.env";
    let filePath = (0, path_1.resolve)(`${dest}/${filename}`);
    if (!(0, fs_1.existsSync)(filePath)) {
        filePath = fallback;
    }
    return filePath;
}
exports.getEnvPath = getEnvPath;
function ToBoolean() {
    return (0, class_transformer_1.Transform)((value) => value.obj[value.key]);
}
exports.ToBoolean = ToBoolean;
function formatId(value, args) {
    let s = value + '';
    while (s.length < args) {
        s = '0' + s;
    }
    return s;
}
exports.formatId = formatId;
//# sourceMappingURL=env.helper.js.map