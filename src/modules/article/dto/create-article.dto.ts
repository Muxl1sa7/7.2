import { ApiProperty } from "@nestjs/swagger";
import { isString } from "class-validator";

export class CreateArticleDto {
    @isString()
    @ApiProperty({defould:"HTML"})
   title!: string;

   @isString()
   @ApiProperty(defould:"HTML is Cool")
   content!: string;

}
