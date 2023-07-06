import { Column, Entity, Index, OneToMany } from "typeorm";
import { Users } from "./Users";

@Index("PetCompanion_pkey", ["petCompanionId"], { unique: true })
@Entity("PetCompanion", { schema: "dbo" })
export class PetCompanion {
  @Column("bigint", { primary: true, name: "PetCompanionId" })
  petCompanionId: string;

  @Column("character varying", { name: "Name" })
  name: string;

  @OneToMany(() => Users, (users) => users.petCompanion)
  users: Users[];
}
