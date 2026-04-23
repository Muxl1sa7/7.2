import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, isNotEmpty, Matches, MaxLength, MIN_LENGTH, MinLength } from "class-validator";

export class loginDto {
    @IsString()
    @MinLength(3,{message:"Kamida 3 ta harf bo'lsin"})
    @MaxLength(50)
    @ApiProperty({defoult:"muxlisa"})
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({defoult:"muxlisa!gmail.com"})
    email!: string;

@IsString()@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {message:"Kamida 8 ta belgidan iborat bo'lsin, kamida 1 ta harf va 1 ta raqam bo'lsin"})
@ApiProperty({defoult:"muxlisa1234!sad"})
    password!: string;
}
