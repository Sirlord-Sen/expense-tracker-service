import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { ISafeUser } from 'src/user/interfaces/user.interface'
import { ITokens } from '../interfaces/token.interface'

export class LoginUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}

class Authentication{
    @ApiProperty()
    user?: ISafeUser

    @ApiProperty()
    tokens?: ITokens
} 

export class AuthPayload{
    @ApiProperty()
    message: string

    @ApiProperty()
    data: Authentication
}
