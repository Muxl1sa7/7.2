import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entites/base.entiy";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { Column, DeleteDateColumn, Entity, JoinColumn, ManyToOne} from "typeorm";
import { ManyToMany } from "typeorm/browser";

@Entity({name: 'article'})
export class Article extends BaseEntity {

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    backgroundImage!:string

    @DeleteDateColumn({nullable:true})
    deletedAt?:Date;
// relation


    @ManyToOne(()=>Auth,(user)=>user.article)
    @JoinColumn({name:"user_id"})
    author!:Auth;

    @ManyToMany(()=>Tag.(tag)=>tag.article,{nullable:false, cascade:false})
     @JoinColumn({name:"tag_id"})
tags!:Tag[]
}

