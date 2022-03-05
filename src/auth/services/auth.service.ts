import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { RefreshTokenRepository } from "../repository/refreshToken.repository";


@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(RefreshTokenRepository) private refreshTokenRepository: RefreshTokenRepository,
    ) {}

    async login(user: Omit<any, 'fullname'>): Promise<any> {
        
    }
}    