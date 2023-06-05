import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("pk_messages_997578592", ["messageId"], { unique: true })
@Entity("Messages", { schema: "dbo" })
export class Messages {
  @PrimaryGeneratedColumn({ type: "bigint", name: "MessageId" })
  messageId: string;

  @Column("text", { name: "Message" })
  message: string;

  @Column("bigint", { name: "FromUserId" })
  fromUserId: string;

  @Column("bigint", { name: "ToUserId" })
  toUserId: string;

  @Column("timestamp without time zone", { name: "DateTime" })
  dateTime: Date;

  @Column("boolean", { name: "IsCustomer", default: () => "false" })
  isCustomer: boolean;
}
