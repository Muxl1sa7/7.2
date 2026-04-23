import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { VerifyDto } from './dto/verify.dto';
import { ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiOkResponse, ApiOperation, ApiResponse, ApiTags, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { loginDto } from './dto/login.dto';


@ApiInternalServerErrorResponse({ description: "Internal server error" })
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }
  @ApiOperation({ description: "royahtdan otish uchun" })
  @ApiResponse({ status: 400, description: "User already exsits" })
  @ApiResponse({ status: 201, description: "Registered" })
  @HttpCode(201)
  @Post("register")
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto);
  }


  @ApiBadRequestResponse({ description: "Invalid otp" })
  @ApiBadRequestResponse({ description: "Wrong otp" })
  @ApiBadRequestResponse({ description: "expired" })
  @ApiUnauthorizedResponse({ description: "Email not found" })
  @HttpCode(200)
  @Post("verify")
  verify(@Body() Dto: VerifyDto) {
    return this.authService.verify(Dto);
  }



  @ApiBadRequestResponse({ description: "Invalid otp" })
  @ApiBadRequestResponse({ description: "Wrong otp" })
  @ApiOkResponse({ description: "Please chek your email" })
  @Post("login")
  @HttpCode(200)
  login(@Body() dto: loginDto) {
    return this.authService.login(dto)
  }
}
