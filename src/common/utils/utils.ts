/* eslint-disable @typescript-eslint/no-var-requires */
import { getConnectionOptions, getConnection } from "typeorm";
import * as bcrypt from "bcrypt";
import { RoleEnum } from "../enums/role.enum";
import { HeartRateStatus } from "../constant/heart-rate-status.constant";
import { createCipheriv, randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import * as fs from "fs";
import * as path from "path";

export const toPromise = <T>(data: T): Promise<T> => {
  return new Promise<T>((resolve) => {
    resolve(data);
  });
};

export const getDbConnectionOptions = async (connectionName = "default") => {
  const options = await getConnectionOptions(
    process.env.NODE_ENV || "development"
  );
  return {
    ...options,
    name: connectionName,
  };
};

export const getDbConnection = async (connectionName = "default") => {
  return await getConnection(connectionName);
};

export const runDbMigrations = async (connectionName = "default") => {
  const conn = await getDbConnection(connectionName);
  await conn.runMigrations();
};

export const hash = async (value) => {
  return await bcrypt.hash(value, 10);
};

export const compare = async (newValue, hashedValue) => {
  return await bcrypt.compare(hashedValue, newValue);
};

export const getAge = async (birthDate: Date) => {
  const timeDiff = Math.abs(Date.now() - birthDate.getTime());
  return Math.floor(timeDiff / (1000 * 3600 * 24) / 365.25);
};

export const isStaffRegistrationApproved = (roleId: number): boolean => {
  if (roleId === RoleEnum.ADMIN) return true;
  else if (roleId === RoleEnum.MANAGER) return true;
  else if (roleId === RoleEnum.STAFF) return true;
  else if (roleId === RoleEnum.CASHIER) return true;
  else return false;
};

export const addHours = (numOfHours, date: Date) => {
  date.setTime(date.getTime() + numOfHours * 60 * 60 * 1000);
  return date;
};

export const round = (number) => {
  return Math.round((number + Number.EPSILON) * 100);
};

export const getHearRateTargetPercentage = (age, value: number) => {
  value = Number(value);
  let percent = 0;
  let avg = 0;
  const getChart = HeartRateStatus.filter(
    (x) => x.ageFrom >= age && age <= x.ageTo
  )[0];
  if (getChart && getChart !== undefined) {
    avg = (getChart.max + getChart.min) / 2;
  } else {
    avg = 220 - age;
  }
  if (avg >= value && value <= age - 220) {
    percent = (value / avg) * 100;
  } else if (avg < value && value <= 220) {
    percent = (avg / value) * 100;
  } else {
    percent = (value / 220) * 100;
  }
  return percent;
};

export const AESEncrypt = async (value) => {
  // crypto module
  const crypto = require("crypto");

  const algorithm = "aes-256-cbc";

  // generate 16 bytes of data
  const initVector = crypto
    .createHash("sha512")
    .update(
      fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key"))
    )
    .digest("hex")
    .substring(0, 16);

  // secret key generate 32 bytes of data
  const Securitykey = crypto
    .createHash("sha512")
    .update(
      fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key"))
    )
    .digest("hex")
    .substring(0, 32);

  // the cipher function
  const cipher = crypto.createCipheriv(algorithm, Securitykey, initVector);
  return Buffer.from(
    cipher.update(value, "utf8", "hex") + cipher.final("hex")
  ).toString("base64"); // Encrypts data and converts to hex and base64
};

export const AESDecrypt = async (value) => {
  // crypto module
  const crypto = require("crypto");

  const algorithm = "aes-256-cbc";

  // generate 16 bytes of data
  const initVector = crypto
    .createHash("sha512")
    .update(
      fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key"))
    )
    .digest("hex")
    .substring(0, 16);

  // secret key generate 32 bytes of data
  const Securitykey = crypto
    .createHash("sha512")
    .update(
      fs.readFileSync(path.join(__dirname, "../../../refreshtoken.private.key"))
    )
    .digest("hex")
    .substring(0, 32);

  const buff = Buffer.from(value, "base64");
  const decipher = crypto.createDecipheriv(algorithm, Securitykey, initVector);
  return (
    decipher.update(buff.toString("utf8"), "hex", "utf8") +
    decipher.final("utf8")
  ); // Decrypts data and converts to utf8
};
