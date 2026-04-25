import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tag } from "./entities/tag.entity";
import { Repository } from "typeorm";
import { UpdateArticleDto } from "../article/dto/update-article.dto";
import { NotFoundError } from "rxjs";







@Injectable()
export class TagService {
    constructor(@InjectRepository(Tag) private tagRepo: Repository<Tag>) { }
    async create(createTagDto: CteateTagDto, userId: any) {
        const foundedTag = await this.tagRepo.findOne({ where: { name: this.createTagDto.name } })
        if (foundedTag) throw new BadRequestException("Tag nam already exists")

        const tag = this.tagRepo.create({...createTagDto, createdBy: userId})
        return await this.tagRepo.save(tag);
    }


    findAll() {
        return `This action returns all tag`;
    }


    finOne(id: number) {
        const foundedTag = await this.tagRepo.findOne({ where: { id } })
        if (!foundedTag) throw new NotFoundException("Tag not found")
        return foundedTag;
    }

    update(id: number, updateTagDto: UpdateTagDto) {
        const foundedTag = await this.tagRepo.findOne({ where: { id } })
        if (!foundedTag) throw new NotFoundException("Tag not found")
        return { message: "Updated" };
    }

    remove(id: number) {
        const foundedTag = await this.tagRepo.findOne({ where: { id } })
        if (!foundedTag) throw new NotFoundException("Tag not found")
        return { message: "Deleted" };
    }
}