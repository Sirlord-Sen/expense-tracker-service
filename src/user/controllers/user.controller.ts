import { Controller, Post, Res, Body, Get, Req } from '@nestjs/common'
import { Response } from 'express'
import { AuthPayload } from 'src/auth/dtos/auth.dto'
import { TokenService } from 'src/auth/services/token.service'
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { CreateUserDto, UserPayload } from '../dtos/user.dto'
import { UserService } from '../services/user.service'

@Controller('/api/v1/user')
export class UserController {
    constructor(
        private userService: UserService,
        private tokenService: TokenService
    ){}  

    @Post('/signup')
    async signup(@Body(new ValidationPipe()) body: CreateUserDto):Promise<AuthPayload>
        {
        const user = await this.userService.signup(body)
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
    async getUser(@Res() res, @Req() req)
    // : Promise<UserPayload>
    {
        const { userId } = req.user
        const user = await this.userService.findCurrentUser({id: userId})
        return res.json({
            message: "Current User",
            data: {
                user: user
            }
        })
    }

}