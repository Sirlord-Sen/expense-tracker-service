export enum TokenType {
    BEARER = 'Bearer'
}

export interface ITokens {
    accessToken: string,
    refreshToken: string,
    tokenType: TokenType,
    expiresAt: Date
}

export type IAccessToken = Pick<ITokens, 'accessToken' | 'expiresAt'>

export interface IRefreshToken {
    expiredAt: Date;
    isRevoked?: boolean;
    jti: string;
    userId: string;
}

export interface IFullRefreshToken{
    id?:string
    expiredAt?: Date;
    isRevoked?: boolean;
    jti?: string;
    userId?: string;
    created_at?: Date
    updated_At?: Date
}