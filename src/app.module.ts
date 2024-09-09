import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HashService } from './services/hash.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    AuthModule,
  ],
  providers: [HashService],
})
export class AppModule {}
