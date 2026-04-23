import { ApiProperty } from "@nestjs/swagger";
import { CreateArticleDto } from "./create-article.dto";

export class createArticleFileDto extends CreateArticleDto{
   @ApiProperty(({type:"string", format:"binary"}))
   file!: any
}
