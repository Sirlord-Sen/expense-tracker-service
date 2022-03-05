import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './repository/user.repository';
import { UserService } from './services/user.service';
import * as dotenv from 'dotenv';

dotenv.config();

@Global()
@Module({
  controllers: [UserController],
  providers: [UserService],
//   exports: [JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
  ],
  exports: [UserService],
})
export class UserModule {}
