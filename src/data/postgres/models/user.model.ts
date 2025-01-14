import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Role {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT"
}

export enum Status {
  AVAIBLE = "AVAIBLE",
  DISABLED = "DISABLED"
}

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

  @Column("enum", {
    enum: Role,
    default: Role.CLIENT,
  })
  role: string;

  @Column("enum", {
    enum: Status,
    default: Status.AVAIBLE,
  })
  status: string;
}
