import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import nodemailer from 'nodemailer';
import { verify } from 'crypto';
import { access } from 'fs';

@Injectable()
export class AuthService {
  private nodemailer: nodemailer.Transporter;
  constructor(@InjectRepository(Auth) private authRepo: Repository<Auth>) { }
   this.nodemailer = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "durdiboyevamuxlisa7@gmail.com",
      pass: process.env.APP_KEY
    }
  });
  async register(createAuthDto: CreateAuthDto) {
  const { username, email, password } = createAuthDto
  const foundedUser = await this.authRepo.findOne({ where: { email } })

  if (foundedUser) throw new BadRequestException('User already exists')

  const hashedPassword = await bcrypt.hash(password, 10)

  const otp = Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join('')
  const otpTime = Date.now() + 120000
  await this.nodemailer.sendMail({
    from: "durdiboyevamuxlisa7@gmail.com",
    to: email,
    subject: "Lesson",
    text: "test content",
    html: `<b>${otp}</b>`
  });

  const user = this.authRepo.create({ username, email, password: hashedPassword, otp, otpTime: otpTime })
  await this.authRepo.save(user)

  return { message: "Registered" }

  async verify(dto: VerifyDto) {
    const { email, otp } = dto

    const foundedUser = await this.authRepo.findOne({ where: { email } })

    const otpValidation=/^\d{6}$/.test(otp)

      if (!otpValidation) throw new BadRequestException("Invalid otp format")

    if (!foundedUser) throw new UnauthorizedException("Email not found")

      if (foundedUser.otp !== otp) throw new BadRequestException("Invalid otp")
        const now = Date.now()
    if (foundedUser.otpTime < Date.now()) throw new BadRequestException("Otp expired")
      await this.authRepo.update(foundedUser.id, { otp:"", otpTime: "0" })

    const payload = { id: foundedUser.id, email: foundedUser.email, role: foundedUser.role }
    return{
      access_token: await this.jwtService.signAsync(payload)
    }
  }
}


