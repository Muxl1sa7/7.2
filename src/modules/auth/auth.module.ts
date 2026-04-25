import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from './entities/auth.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
  [TypeOrmModule.forFeature([Auth])],
  JwtModule.registerAsync({
   imports:[ConfigModule],
   inject:[ConfigService],
   useFactory:(config: ConfigService)=>({
    secret:config.get<string>('JWT_SECRET'),
    signOptions:
    {expiresIn:"7d"},
   })
  }),
],
  
  controllers: [AuthController],
  providers: [AuthService],
  exports:[JwtModule]
})
export class AuthModule {}


