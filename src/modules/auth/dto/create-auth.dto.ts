import { IsEmail, IsNotEmpty, isNotEmpty, Matches, MaxLength, MIN_LENGTH, MinLength } from "class-validator";
import { IsString } from "class-validator/types/decorator/typechecker/IsString";

export class CreateAuthDto {
    @IsString()
    @MinLength(3,{message:"Kamida 3 ta harf bo'lsin"})
    @MaxLength(50)
    username!: string;

    @IsEmail()
    @IsNotEmpty()
    email!: string;

@IsString()@Matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, {message:"Kamida 8 ta belgidan iborat bo'lsin, kamida 1 ta harf va 1 ta raqam bo'lsin"})
    password!: string;
}
