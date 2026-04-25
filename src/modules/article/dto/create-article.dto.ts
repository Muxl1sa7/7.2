import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { isArray, IsInt, isString } from "class-validator";
import { Tag } from "src/modules/tag/entities/tag.entity";

export class CreateArticleDto {
    @isString()
    @ApiProperty({defould:"HTML"})
   title!: string;

   @isString()
   @ApiProperty(defould:"HTML is Cool")
   content!: string;


   @Transform(({value})=>
    typeof value==="string" 
    ? value.split(",").map((item) =>Number(item))
    :value
)
   @IsArray()
   @IsInt({each:true})
   @ApiProperty({defoult:[1 ,2, 3]})
   tags!:number[]
}
