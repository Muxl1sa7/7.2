
import { Article } from "src/modules/article/entities/article.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { RolesUser } from "src/shared/enums/roles.enum";
import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Column,Entity } from "typeorm"

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
// reletion
@OneToMany(()=>Article,(article) =>article.author)
article!:Article[]


@OneToMany(()=>Tag,(tag)=> tag.createBy)
tags!:Tag[]
}
