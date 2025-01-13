import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Repair extends BaseEntity {

  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("date", {
        default: () => "CURRENT_TIMESTAMP"
    })
  date: Date;

  @Column("bool", {
    default: true,
  })
  status: boolean;
}
