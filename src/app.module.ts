import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from './modules/auth/auth.module';
import { Auth } from './modules/auth/entities/auth.entity';
// import { ArticleModule } from './article/article.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: "localhost", 
      port: 5432,
      username: "postgres",
      database:String(process.env.DB_NAME as string),
      password: String(process.env.DB_PASSWORD as string),
      entities:[Auth],
     synchronize: true,
     logging: false
    }),
    AuthModule,
    // ArticleModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
