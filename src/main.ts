import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

app.useGlobalPipes(new ValidationPipe(
 { transform: true,
  forbidNonWhitelisted: true,
  whitelist: true}
));

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, () => {
    console.log(PORT);
  });
}
bootstrap();
