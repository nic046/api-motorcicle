import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
  })
  name: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
  })
  password: string;

  @Column("varchar", {
    length: 100,
    nullable: false,
    default: "client",
  })
  role: string;

  @Column("bool", {
    default: true,
  })
  status: boolean;
}
