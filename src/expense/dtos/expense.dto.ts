import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsNumber } from 'class-validator'
import { ISafeUser } from 'src/user/interfaces/user.interface'
// import { ISafeUser, IUser } from '../interfaces/user.interface'

export class CreateExpenseDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    amount: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: 'food' | 'transportation' | 'clothes' | 'accommodation' | 'entertainment'
}

// class ExpenseData{
//     @ApiProperty()
//     user: ISafeUser

//     @ApiProperty()
//     expenses: 
// }

// export class UserPayload{
//     @ApiProperty()
//     message: string

//     @ApiProperty()
//     data?: UserData
// }
