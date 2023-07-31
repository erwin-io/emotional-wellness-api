import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { NotificationService } from "./notification.service";
import { UsersService } from "./users.service";
import { SystemConfigService } from "./system-config.service";
export declare class SchedulerService {
    private firebaseProvoder;
    private usersService;
    private notificationService;
    private systemConfigService;
    constructor(firebaseProvoder: FirebaseProvider, usersService: UsersService, notificationService: NotificationService, systemConfigService: SystemConfigService);
    runReminder(): Promise<void>;
    firebaseSendToDevice(token: any, title: any, description: any): Promise<void>;
}
