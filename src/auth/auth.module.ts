import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]), // This provides the Repository
  ],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
