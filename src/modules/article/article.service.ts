import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
import(Article) from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepo: ReposArticle<Article>
  ) {}
  async create(createArticleDto: CreateArticleDto, file:Express.Multer.File) {
    const article = this.articleRepo.create(createArticleDto)

    article.backgroundImage= `https://localhhost:400/uploads${filename}`
    return await this.articleRepo.find()
  }

  async findAll(): Promise<Article[]> {
    return await this.articleModel.findAll();
  }

  async findOne(id: number): Promise<Article> {
    const foundedArticle = await this.articleRepo.findByPk(id);
    if (!foundedArticle) { throw new NotFoundException('Article not found') }
    return foundedArticle;
  }

  async update(id: number, updateArticleDto: UpdateArticleDto): Promise<{ message: "Updated" }> {
    const foundedArticle = await this.articleRepo.findOne({ where: { id } });
    if (!foundedArticle) throw new NotFoundException("Article not found")
    await this.articleRepo.update(foundedArticle.id, updateArticleDto);
    return { message: "Updated" }
  }

  async remove(id: number): Promise<{ message: "Deleted" }> {
    const foundedArticle = await this.articleRepo.findOne({ where: { id } });
    if (!foundedArticle) throw new NotFoundException('Article not found')
    return { message: "Deleted" }
  }
