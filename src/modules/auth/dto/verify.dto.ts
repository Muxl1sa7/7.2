import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class VerifyDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({defoult:"durdiboyevamuxlisa@gmail.com"})
    email!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({defoult:"12345"})
    otp!: string;

}