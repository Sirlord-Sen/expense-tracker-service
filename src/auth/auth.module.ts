import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './controllers/auth.controller';
import { RefreshTokenRepository } from './repository/refreshToken.repository';
import { AuthService } from './services/auth.service';
import * as dotenv from 'dotenv';
import { JwtStrategy } from './jwt.strategy';
import { TokenService } from './services/token.service';

dotenv.config();

@Global()
@Module({
  controllers: [AuthController],
  providers: [AuthService, TokenService ,JwtStrategy],
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {expiresIn: process.env.JWT_EXPIRATION}
    }),
    TypeOrmModule.forFeature([RefreshTokenRepository]),
  ],
  exports: [TokenService]
})
export class AuthModule {}
