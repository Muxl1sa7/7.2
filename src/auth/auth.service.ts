import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { Auth } from './model/auth.entity';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt';
import { Article } from 'src/article/model/article.entity';

@Injectable()
export class AuthService {
  constructor(@InjectModel(Auth) private authModel: typeof Auth) {}
   
  async register(createAuthDto: CreateAuthDto) {
   const{ username, email, password } = createAuthDto
   const foundedUser = await this.authModel.findOne({ where: { email }, raw: true })
    if (foundedUser)  throw new BadRequestException('User already exists') 
      const hashedPassword = await bcrypt.hash(password, 10)
    const otp =+Array.from({ length: 6 }, () => Math.floor(Math.random() * 9)).join('')
    return this.authModel.create({ username, email, password: hashedPassword, otp })
  }

  async findAll() {
    return await this.authModel.findAll({
      attributes: { exclude: ['password'] },
      include:[{model:Article}]
    });
  }

  async findOne(id: number) {
    return await this.authModel.findByPk(id, { exclude: ['password'] });
  }

  async update(id: number, updateAuthDto: UpdateAuthDto) {
    const auth = await this.authModel.findByPk(id);
    if (!auth) {
      throw new BadRequestException('User not found');
    }
    return await auth.update(updateAuthDto);
  }

  async remove(id: number) {
    const auth = await this.authModel.findByPk(id);
    if (!auth) {
      throw new BadRequestException('User not found');
    }
    return await auth.destroy();
  }
}
