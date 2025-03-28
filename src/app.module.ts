import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ProgressController } from './progress/progress.controller';
import { ProgressModule } from './progress/progress.module';
import { Progress } from './entities/progress.entities';
import { Activity } from './entities/activity.entities';
import { Lesson } from './entities/lesson.entities';
import { Level } from './entities/level.entities';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://plutongues_postgres_user:g9NfJSW6s8efEQwodhcozQFPkXm7Tw85@dpg-cvgku68gph6c73blo900-a.oregon-postgres.render.com/plutongues_postgres',
      entities: [User, Level, Progress, Activity, Lesson],
      synchronize: true,
      ssl: true,
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    }),
    TypeOrmModule.forFeature([User, Level, Lesson, Activity, Progress]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProgressModule,
    AuthModule,
  ],
  controllers: [AppController, ProgressController],
  providers: [AppService],
})
export class AppModule {}
