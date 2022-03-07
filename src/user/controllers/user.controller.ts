import { Controller, Post, Res, Body, Get, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthPayload } from 'src/auth/dtos/auth.dto'
import { JwtAuthGuard } from 'src/auth/jwt.guard'
import { TokenService } from 'src/auth/services/token.service'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { BalanceService } from 'src/expense/services/balance.service'
import { ExpenseService } from 'src/expense/services/expense.service'
import { CreateUserDto, UserPayload } from '../dtos/user.dto'
import { UserService } from '../services/user.service'

@ApiTags('User Actions')
@Controller('/api/v1/user')
export class UserController {
    constructor(
        private userService: UserService,
        private tokenService: TokenService,
        private balanceService: BalanceService
    ){}  

    @Post('/signup')
    async signup(@Body(new ValidationPipe()) body: CreateUserDto):Promise<AuthPayload>
        {
        const balance = await this.balanceService.createBalance()
        const user = await this.userService.signup(body, balance)
        const tokens = await this.tokenService.getTokens(user)
    
        return {
            message: "User Created",
            data: {
                user: user,
                tokens: tokens
            }
        }
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    async getUser(@Req() req) : Promise<UserPayload> {
        const { userId } = req.user
        const user = await this.userService.findCurrentUser({id: userId})

        return {
            message: "Current User",
            data: {
                user: user
            }
        }
    }

}