import { ApiProperty } from "@nestjs/swagger";
import { isEmail, isEmpty, isString } from "class-validator";

export class createTagDto{
    @isString()
    @isNotEmpty()
    @ApiProperty({defould:'HTML'})
    name!:string;


}