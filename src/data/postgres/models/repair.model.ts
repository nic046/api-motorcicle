import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.model";

export enum RepairStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
  CANCELLED = "CANCELLED",
}

@Entity()
export class Repair extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date", {
    nullable: false,
    default: () => "CURRENT_TIMESTAMP",
  })
  date: Date;

  @Column("varchar")
  motorsNumber: string

  @Column("varchar", {
    length: 100,
  })
  description: string

  @Column("enum", {
    enum: RepairStatus,
    default: RepairStatus.PENDING
  })
  status: string;

  @Column("varchar", {
    nullable: false,
  })
  userId: string;

  @ManyToOne(() => User, (user) => user.repairs)
  user: User

}
