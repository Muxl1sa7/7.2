import { ApiProperty } from "@nestjs/swagger";
import { isEmail, isEmpty, isString } from "class-validator";

export class createTagDto{
    @isString()
    @isEmpty()
    @ApiProperty({defould:'HTML'})
    name!:string;


}