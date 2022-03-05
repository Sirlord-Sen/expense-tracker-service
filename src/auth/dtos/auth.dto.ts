import { IsString, IsNotEmpty } from 'class-validator'
import { ISafeUser } from 'src/user/interfaces/user.interface'
import { ITokens } from '../interfaces/token.interface'

export class LoginUserDto{
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class AuthPayload{
    message: string
    data: Authentication
}

class Authentication{
    user?: ISafeUser
    tokens?: ITokens
} 
