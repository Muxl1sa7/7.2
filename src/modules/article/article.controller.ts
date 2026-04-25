import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, UseInterceptors, UseGuards } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
import { ApiBearerAuth, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { Article } from './entities/article.entity';
import { diskStorage } from "multer"
import { FileInterceptor } from '@nestjs/platform-express';
import { filepathToName } from 'typeorm/util/PathUtils.js';
import { AuthGuard } from 'src/common/guards/auth-guards';
import { Roles } from 'src/common/decorators/roles.decarator';
import { RolesUser } from 'src/shared/enums/roles.enum';


@ApiBearerAuth("JWT-auth")
@ApiInternalServerErrorResponse({ description: "Internal server error" })
@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) { }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN ,RolesUser.SUPERADMIN)
  @ApiOkResponse()
  @ApiBody({ type: createArticleFileDto })
  @HttpCode(201)
  @Post()
  @ApiConsumes{ "multipart/form-data" }
@UseInterceptor(
  FileInterceptor("file", {
    stronge: diskStorage({
      destination: path.join(process.cwd(), "uploads")
      filename: (req, file, cb) => {
        const uniqueSuffix = `${file.originalname}${Data.now()}`
        const ext = path.extname(file.originalname)
        cb(null, `${uniqueSuffix}${ext}`)
      },
    })
  })
)
create(@Body() createArticleDto: CreateArticleDto) {
  return this.articleService.create(createArticleDto);
}

@ApiOkResponse
  ({
    description: "List of articles",
    type: [CreateArticleDto]
  })
@HttpCode(200)
@Get()
findAll() {
  return this.articleService.findAll();
}


@ApiNotFoundResponse({ description: "Article not found" })
@HttpCode(200)
@Get(':id')
findOne(@Param('id') id: string) {
  return this.articleService.findOne(+id);
}


@UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN ,RolesUser.USER)
@ApiOkResponse({ description: "Updated" })
@ApiNotFoundResponse({ description: "Article not found" })
@HttpCode(200)
@Patch(':id')
update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  return this.articleService.update(+id, updateArticleDto);
}



@UseGuards(AuthGuard, RolesGuard)
  @Roles(RolesUser.ADMIN ,RolesUser.SUPERADMIN)
@ApiOkResponse({ description: "Deleted" })
@HttpCode(200)
@Delete(':id')
remove(@Param('id') id: string) {
  return this.articleService.remove(+id);
}
}
