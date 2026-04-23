import { ApiProperty, ApiResponse } from "@nestjs/swagger";
import { isNumber, isString } from "class-validator";

export class ArticleResponseDto {
    @isNumber()
    @ApiProperty({defoult:1})
    @ApiProperty({defould:"HTML"})
   title!: string;

   @isString()
   @ApiProperty(defould:"HTML is Cool")
   content!: string;

}
