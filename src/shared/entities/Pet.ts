import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToOne,
} from "typeorm";
import { Files } from "./Files";
import { Users } from "./Users";

@Index("Pet_pkey", ["userId"], { unique: true })
@Entity("Pet", { schema: "dbo" })
export class Pet {
  @Column("bigint", { primary: true, name: "UserId" })
  userId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @ManyToOne(() => Files, (files) => files.pets)
  @JoinColumn([{ name: "ProfilePicFileId", referencedColumnName: "fileId" }])
  profilePicFile: Files;

  @OneToOne(() => Users, (users) => users.pet)
  @JoinColumn([{ name: "UserId", referencedColumnName: "userId" }])
  user: Users;
}
