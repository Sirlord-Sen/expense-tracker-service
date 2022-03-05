import { EntityRepository, Repository } from 'typeorm';
import { RefreshToken } from '../entity/refreshToken.entity';

@EntityRepository(RefreshToken)
export class RefreshTokenRepository extends Repository<RefreshToken> {
  
}
