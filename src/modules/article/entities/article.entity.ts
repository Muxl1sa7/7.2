import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity } from "src/database/entites/base.entiy";
import { Column, Entity} from "typeorm";

@Entity({name: 'article'})
export class Article extends BaseEntity {

    @Column()
    title!: string;

    @Column()
    content!: string;

    @Column()
    backgroundImage!:string
}

