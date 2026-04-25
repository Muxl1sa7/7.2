import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { UpdateArticleDto } from "../article/dto/update-article.dto";







@Injectable()
export class TagService{
    constructor(@InjectRepository(Tag)private tagRepo:Repository<Tag>){}
    create(createTagDto:CteateTagDto){
        return ;
    }


    findAll(){
        return `This action returns all tag`;
    }


finOne(id:number){
    return `This action returns a #${id} tag`;
}

update(id:number, updateTagDto:UpdateTagDto){
return `This action updates a #${id} tag`;
}

remove(id:number){
    return `This action removes a #${id} tag`;
}
}