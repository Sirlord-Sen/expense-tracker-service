import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty } from 'class-validator'
import { ISafeUser, IUser } from '../interfaces/user.interface'

export class CreateUserDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    username: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    email: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    firstname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    surname: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    password: string
}

class UserData{
    @ApiProperty()
    user: ISafeUser
}

export class UserPayload{
    @ApiProperty()
    message: string

    @ApiProperty()
    data?: UserData
}
