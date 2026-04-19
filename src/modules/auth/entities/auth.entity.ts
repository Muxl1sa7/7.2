
import { RolesUser } from "src/shared/enums/roles.enum";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Entity } from "typeorm/browser/decorator/entity/Entity.js";

@Entity({name: 'auth'})
export class Auth extends BaseEntity {

    @Column()
    username!: string;

    @Column()
    email!: string;

    @Column()
    password!: string;

    @Column({type:"enum", enum: RolesUser, default: RolesUser.USER})
    role!: RolesUser;

    @Column(nullable: true)
    otp?: string;

  @Column ({type:"bigint", nullable: true})
  otpTime?: number;


}
