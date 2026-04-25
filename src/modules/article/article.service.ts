import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import { In, Repository } from 'typeorm';
import { Tag } from '../tag/entities/tag.entity';
import(Article) from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: ReposArticle<Article>
    @InjectRepository(Tag) private tagRepo: Repository<Tag>
  ) {}
  async create(createArticleDto: CreateArticleDto, file:Express.Multer.File, userId) {
const foundedTags = await this.tagRepo.findBy({id:In(createArticleDto.tags)})
if (!foundedTags) throw new BadRequestException()
    const article = this.articleRepo.create({
  ...createArticleDto,
  author: userId,
  tags: foundedTags
  });

    article.backgroundImage= `https://localhhost:400/uploads${filename}`
    return await this.articleRepo.find()
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.findAll();
  }

  async findOne(id: number): Promise<Article> {
    const foundedArticle = await this.articleRepo.findOne({
      where:{ id},
      relations:["author", "tags"]
    });


    if (!foundedArticle) { throw new NotFoundException('Article not found') }
    return foundedArticle;
  }

async update(
  id: number,
  updateArticleDto: UpdateArticleDto
): Promise<{ message: string }> {

  const foundedArticle = await this.articleRepo.findOne({
    where: { id }
  });

  if (!foundedArticle) {
    throw new NotFoundException("Article not found");
  }

  const updatedArticle = Object.assign(
    foundedArticle,
    updateArticleDto
  );

  await this.articleRepo.save(updatedArticle);

  return { message: "Updated" };
}

  async remove(id: number): Promise<{ message: "Deleted" }> {
    const foundedArticle = await this.articleRepo.findOne({ where: { id } });
    if (!foundedArticle) throw new NotFoundException('Article not found')
      await this.articleRepo.softDelete({id})
    return { message: "Deleted" }
  }
