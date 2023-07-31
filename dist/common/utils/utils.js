"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AESDecrypt = exports.AESEncrypt = exports.getHearRateTargetPercentage = exports.round = exports.addHours = exports.isStaffRegistrationApproved = exports.getAge = exports.compare = exports.hash = exports.runDbMigrations = exports.getDbConnection = exports.getDbConnectionOptions = exports.toPromise = void 0;
const typeorm_1 = require("typeorm");
const bcrypt = require("bcrypt");
const role_enum_1 = require("../enums/role.enum");
const heart_rate_status_constant_1 = require("../constant/heart-rate-status.constant");
const fs = require("fs");
const path = require("path");
const toPromise = (data) => {
    return new Promise((resolve) => {
        resolve(data);
    });
};
exports.toPromise = toPromise;
const getDbConnectionOptions = async (connectionName = "default") => {
    const options = await (0, typeorm_1.getConnectionOptions)(process.env.NODE_ENV || "development");
    return Object.assign(Object.assign({}, options), { name: connectionName });
};
exports.getDbConnectionOptions = getDbConnectionOptions;
const getDbConnection = async (connectionName = "default") => {
    return await (0, typeorm_1.getConnection)(connectionName);
};
exports.getDbConnection = getDbConnection;
const runDbMigrations = async (connectionName = "default") => {
    const conn = await (0, exports.getDbConnection)(connectionName);
    await conn.runMigrations();
};
exports.runDbMigrations = runDbMigrations;
const hash = async (value) => {
    return await bcrypt.hash(value, 10);
};
exports.hash = hash;
const compare = async (newValue, hashedValue) => {
    return await bcrypt.compare(hashedValue, newValue);
};
exports.compare = compare;
const getAge = async (birthDate) => {
    const timeDiff = Math.abs(Date.now() - birthDate.getTime());
    return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
};
exports.getAge = getAge;
const isStaffRegistrationApproved = (roleId) => {
    if (roleId === role_enum_1.RoleEnum.ADMIN)
        return true;
    else if (roleId === role_enum_1.RoleEnum.MANAGER)
        return true;
    else if (roleId === role_enum_1.RoleEnum.STAFF)
        return true;
    else if (roleId === role_enum_1.RoleEnum.CASHIER)
        return true;
    else
        return false;
};
exports.isStaffRegistrationApproved = isStaffRegistrationApproved;
const addHours = (numOfHours, date) => {
    date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
    return date;
};
exports.addHours = addHours;
const round = (number) => {
    return Math.round((number + Number.EPSILON) * 100);
};
exports.round = round;
const getHearRateTargetPercentage = (age, value) => {
    value = Number(value);
    let percent = 0;
    let avg = 0;
    const getChart = heart_rate_status_constant_1.HeartRateStatus.filter((x) => x.ageFrom >= age && age <= x.ageTo)[0];
    if (getChart && getChart !== undefined) {
        avg = (getChart.max + getChart.min) / 2;
    }
    else {
        avg = 220 - age;
    }
    if (avg >= value && value <= age - 220) {
        percent = (value / avg) * 100;
    }
    else if (avg < value && value <= 220) {
        percent = (avg / value) * 100;
    }
    else {
        percent = (value / 220) * 100;
    }
    return percent;
};
exports.getHearRateTargetPercentage = getHearRateTargetPercentage;
const AESEncrypt = async (value) => {
    const crypto = require("crypto");
    const algorithm = "aes-256-cbc";
    const initVector = crypto
        .createHash("sha512")
        .update(fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key")))
        .digest("hex")
        .substring(0, 16);
    const Securitykey = crypto
        .createHash("sha512")
        .update(fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key")))
        .digest("hex")
        .substring(0, 32);
    const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
    return Buffer.from(cipher.update(value, "utf8", "hex") + cipher.final("hex")).toString("base64");
};
exports.AESEncrypt = AESEncrypt;
const AESDecrypt = async (value) => {
    const crypto = require("crypto");
    const algorithm = "aes-256-cbc";
    const initVector = crypto
        .createHash("sha512")
        .update(fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key")))
        .digest("hex")
        .substring(0, 16);
    const Securitykey = crypto
        .createHash("sha512")
        .update(fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key")))
        .digest("hex")
        .substring(0, 32);
    const buff = Buffer.from(value, "base64");
    const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
    return (decipher.update(buff.toString("utf8"), "hex", "utf8") +
        decipher.final("utf8"));
};
exports.AESDecrypt = AESDecrypt;
//# sourceMappingURL=utils.js.map