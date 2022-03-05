import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refreshToken.entity';
import { IFullRefreshToken, IRefreshToken } from '../interfaces/token.interface';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
    async createRefreshToken(body: IRefreshToken): Promise<RefreshToken> {
        try{
            const token = this.create(body);
            return await this.save(token);
        }
        catch(err){ throw new InternalServerErrorException('Could not save refresh token') }
    }

    async updateRefreshToken( query: Partial<IFullRefreshToken>, body: Partial<IRefreshToken> ): Promise<void> {
        try{ 
            const refreshToken = await this.findOneOrFail({where: query})
            this.merge(refreshToken, body)
            await this.save(refreshToken) 
        }
        catch(err){ 
            console.log(err)
            throw new InternalServerErrorException('Could not update refresh token') }
    }
}
