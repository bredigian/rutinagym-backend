import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { HashService } from './services/hash.service';
import { Module } from '@nestjs/common';
import { MuscleModule } from './muscle/muscle.module';
import { ExerciseModule } from './exercise/exercise.module';
import { RutineModule } from './rutine/rutine.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.development' }),
    AuthModule,
    MuscleModule,
    ExerciseModule,
    RutineModule,
  ],
  providers: [HashService],
})
export class AppModule {}
