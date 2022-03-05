enum TokenType {
    BEARER = 'Bearer'
}

export interface ITokens {
    accessToken: string,
    refreshToken: string,
    tokenType: TokenType,
    expiredAt: Date
}

export interface IRefreshToken {
    expiredAt: Date;
    isRevoked?: boolean;
    jti: string;
    userId: string;
}