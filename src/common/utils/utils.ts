import { getConnectionOptions, getConnection } from "typeorm";
import * as bcrypt from "bcrypt";
import { RoleEnum } from "../enums/role.enum";
import { HeartRateStatus } from "../constant/heart-rate-status.constant";


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
  return Math.round((number + Number.EPSILON) * 100) / 100;
};

export const getHearRateTargetPercentage = (age, value: number) => {
  value = Number(value);
  let percent = 0;
  let avg = 0;
  const getChart = HeartRateStatus.filter(x=>x.ageFrom >= age && age <= x.ageTo)[0];
  if(getChart && getChart !== undefined) {
    avg = (getChart.max + getChart.min) / 2;
  } else {
    avg = 220 - age;
  }
  if(avg >= value && value <= (age - 220)) {
    percent = (value / avg) * 100;
  } else if(avg < value && value <= 220)  {
    percent = (avg / value) * 100;
  } else {
    percent = (value / 220) * 100;
  }
  return percent;
};
