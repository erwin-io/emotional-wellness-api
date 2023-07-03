import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pet } from "./Pet";
import { UserProfilePic } from "./UserProfilePic";

@Index("pk_files_901578250", ["fileId"], { unique: true })
@Entity("Files", { schema: "dbo" })
export class Files {
  @PrimaryGeneratedColumn({ type: "bigint", name: "FileId" })
  fileId: string;

  @Column("text", { name: "FileName" })
  fileName: string;

  @Column("text", { name: "Url", nullable: true })
  url: string | null;

  @OneToMany(() => Pet, (pet) => pet.profilePicFile)
  pets: Pet[];

  @OneToMany(() => UserProfilePic, (userProfilePic) => userProfilePic.file)
  userProfilePics: UserProfilePic[];
}
