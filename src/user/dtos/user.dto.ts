import { IsString, IsNotEmpty } from 'class-validator'
import { ISafeUser, IUser } from '../interfaces/user.interface'

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

class UserData{
    user: ISafeUser
}

export class UserPayload{
    message: string
    data?: UserData
}
