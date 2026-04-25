import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entites/base.entiy";
import { Auth } from "src/modules/auth/entities/auth.entity";
import { Tag } from "src/modules/tag/entities/tag.entity";
import { Column, Entity, JoinColumn} from "typeorm";
import { ManyToMany } from "typeorm/browser";

@Entity({name: 'article'})
export class Article extends BaseEntity {

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    backgroundImage!:string

    @ManyToMany(()=>Auth,(user)=>user.article)
    @JoinColumn({name:"user_id"})
    author!:Auth;

    @ManyToMany(()=>Tag.(tag)=>tag.article)
     @JoinColumn({name:"tag_id"})
tags!:Tag[]
}

