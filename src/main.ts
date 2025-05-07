import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

dotenv.config();


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('plep API')
    .setDescription('플랩 프로젝트의 API 문서입니다.')
    .setVersion('1.0')
    .addTag('plep') // 선택
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('KAKAO_REST_API_KEY:', process.env.KAKAO_REST_API_KEY);

  await app.listen(process.env.PORT ?? 8000);
}
bootstrap();
