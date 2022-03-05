import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { RefreshTokenRepository } from './repository/refreshToken.repository';
import { AuthService } from './services/auth.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    TypeOrmModule.forFeature([RefreshTokenRepository]),
  ],
  exports: [AuthService],
})
export class AuthModule {}
