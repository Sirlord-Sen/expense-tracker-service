import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { RefreshTokenRepository } from "../repository/refreshToken.repository";


@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(RefreshTokenRepository) private refreshTokenRepository: RefreshTokenRepository,
    ) {}

    async getTokens(data: any): Promise<any> {
        
    }
}    