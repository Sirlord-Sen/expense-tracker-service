import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { IUser } from "src/user/interfaces/user.interface";
import { IAccessToken, ITokens, TokenType } from "../interfaces/token.interface";
import { RefreshTokenRepository } from "../repository/refreshToken.repository";
import { JwtService } from "@nestjs/jwt"
import { SignOptions } from 'jsonwebtoken'
import { DateHelper } from "src/common/helpers";
import { nanoid } from 'nanoid'

const BASE_OPTIONS = {
    issuer: 'https://widget-demo-service.herokuapp.com',
  };

@Injectable()
export class TokenService {

    constructor(
        @InjectRepository(RefreshTokenRepository) 
        private refreshTokenRepository: RefreshTokenRepository,
        private readonly jwt: JwtService,
    ) {}

    async generateAccessToken(id: string): Promise<IAccessToken>{
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: id,
        }

        const ms = DateHelper.convertToMS(process.env.JWT_EXPIRATION)
        const expiresAt = DateHelper.addMillisecondToDate(new Date(), ms);
        const accessToken = await this.jwt.signAsync({}, opts)

        return {accessToken, expiresAt}
    }

    async generateRefreshToken(id: string): Promise<string>{
        const jti = nanoid()
        const ms = DateHelper.convertToMS(process.env.JWT_EXPIRATION)
        const expiredAt = DateHelper.addMillisecondToDate(new Date(), ms);

        const token = await this.refreshTokenRepository.createRefreshToken({ jti ,userId: id, expiredAt })
        
        const opts: SignOptions = {
            ...BASE_OPTIONS,
            subject: String(id),
            jwtid: String(token.jti),
          };

        return await this.jwt.signAsync({}, opts)     
    }

    async getTokens(data: Partial<IUser>): Promise<ITokens> {
        const { id } = data
        const [{ accessToken, expiresAt }, refreshToken] = await Promise.all([
            this.generateAccessToken(id),
            this.generateRefreshToken(id)
        ])

        return { tokenType: TokenType.BEARER, expiresAt, accessToken, refreshToken};
    }
}    