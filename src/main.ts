import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const PORT = process.env.PORT;
  await app.listen(PORT, () => {
    console.log(`RutinaGYM API running in PORT ${PORT}`);
  });
}
bootstrap();
