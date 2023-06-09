import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { GatewayConnectedUsers } from "./GatewayConnectedUsers";
import { HeartRateLog } from "./HeartRateLog";
import { JournalEntry } from "./JournalEntry";
import { Notifications } from "./Notifications";
import { UserActivityLog } from "./UserActivityLog";
import { UserProfilePic } from "./UserProfilePic";
import { EntityStatus } from "./EntityStatus";
import { Gender } from "./Gender";
import { PetCompanion } from "./PetCompanion";

@Index("pk_users_1557580587", ["userId"], { unique: true })
@Entity("Users", { schema: "dbo" })
export class Users {
  @PrimaryGeneratedColumn({ type: "bigint", name: "UserId" })
  userId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @Column("character varying", { name: "MobileNumber" })
  mobileNumber: string;

  @Column("date", { name: "BirthDate" })
  birthDate: string;

  @Column("bigint", { name: "Age" })
  age: string;

  @Column("character varying", { name: "Password" })
  password: string;

  @Column("text", { name: "CurrentHashedRefreshToken", nullable: true })
  currentHashedRefreshToken: string | null;

  @Column("text", { name: "FirebaseToken", nullable: true })
  firebaseToken: string | null;

  @Column("timestamp with time zone", {
    name: "Expire",
    default: () =>
      "((now() AT TIME ZONE 'Asia/Manila') + '06:00:00'::interval)",
  })
  expire: Date;

  @Column("timestamp with time zone", {
    name: "LastJournalEntry",
    default: () => "(now() AT TIME ZONE 'Asia/Manila')",
  })
  lastJournalEntry: Date;

  @OneToMany(
    () => GatewayConnectedUsers,
    (gatewayConnectedUsers) => gatewayConnectedUsers.user
  )
  gatewayConnectedUsers: GatewayConnectedUsers[];

  @OneToMany(() => HeartRateLog, (heartRateLog) => heartRateLog.user)
  heartRateLogs: HeartRateLog[];

  @OneToMany(() => JournalEntry, (journalEntry) => journalEntry.user)
  journalEntries: JournalEntry[];

  @OneToMany(() => Notifications, (notifications) => notifications.user)
  notifications: Notifications[];

  @OneToMany(() => UserActivityLog, (userActivityLog) => userActivityLog.user)
  userActivityLogs: UserActivityLog[];

  @OneToOne(() => UserProfilePic, (userProfilePic) => userProfilePic.user)
  userProfilePic: UserProfilePic;

  @ManyToOne(() => EntityStatus, (entityStatus) => entityStatus.users)
  @JoinColumn([
    { name: "EntityStatusId", referencedColumnName: "entityStatusId" },
  ])
  entityStatus: EntityStatus;

  @ManyToOne(() => Gender, (gender) => gender.users)
  @JoinColumn([{ name: "GenderId", referencedColumnName: "genderId" }])
  gender: Gender;

  @ManyToOne(() => PetCompanion, (petCompanion) => petCompanion.users)
  @JoinColumn([
    { name: "PetCompanionId", referencedColumnName: "petCompanionId" },
  ])
  petCompanion: PetCompanion;
}
