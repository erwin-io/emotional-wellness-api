import { UserActivityType } from "./UserActivityType";
import { Users } from "./Users";
export declare class UserActivityLog {
    userActivityLogId: string;
    date: Date;
    os: string;
    osVersion: string;
    browser: string;
    userActivityType: UserActivityType;
    user: Users;
}
