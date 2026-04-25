import { BaseEntity } from "src/database/entites/base.entiy";
import { Article } from "src/modules/article/entities/article.entity";
import { Column } from "typeorm";


@Entity({name:"tag"})
export class Tag extends BaseEntity{
    @Column({unique:true})
    name:"string"

     @ManyToMany(()=>Auth,(user)=>user.tags{nullable:false,cascade:true})
        @JoinColumn({name:"user_id"})
    createdBy!:Auth;


        @ManyToMany(()=>Article.(article)=>article.tags)
 articles!:Article[]
}




