import { IsString, IsNotEmpty } from 'class-validator'
import { ISafeUser } from '../interfaces/user.interface'

export class CreateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    firstname: string

    @IsNotEmpty()
    @IsString()
    surname: string

    @IsNotEmpty()
    @IsString()
    password: string
}

export class UserPayload{
    message: string
    user: ISafeUser
}