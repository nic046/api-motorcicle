import { BaseEntity, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Repair extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column("date")
    date: Date

    @Column("boolean")
    status: boolean
}