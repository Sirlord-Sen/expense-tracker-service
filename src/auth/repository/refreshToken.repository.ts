import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refreshToken.entity';
import { IRefreshToken } from '../interfaces/token.interface';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    async createRefreshToken(body: IRefreshToken): Promise<RefreshToken> {
        try{
            const token = this.create(body);
            return await this.save(token);
        }
        catch(err){ throw new InternalServerErrorException('Could not save refresh token') }
  }
}
