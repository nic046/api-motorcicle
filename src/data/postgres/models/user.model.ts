import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { encriptAdapter } from "../../../config";
import { Repair } from "./repair.model";

export enum Role {
  EMPLOYEE = "EMPLOYEE",
  CLIENT = "CLIENT",
}

export enum Status {
  AVAIBLE = "AVAIBLE",
  DISABLED = "DISABLED",
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

  @OneToMany(() => Repair, (repair) => repair.user)
  repairs: Repair[]

  @BeforeInsert()
    encryptedPassword(){
        this.password = encriptAdapter.hash(this.password)
    }
}
