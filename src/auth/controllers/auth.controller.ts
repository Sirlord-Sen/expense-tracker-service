import { Controller, Post, Res, Body, Req, UseGuards } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { AuthPayload, LoginUserDto } from '../dtos/auth.dto';
import { JwtAuthGuard } from '../jwt.guard';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@ApiTags('Authentication')
@Controller('/api/v1/auth')
export class AuthController {
    constructor(
        private authservice: AuthService,
        private tokenService: TokenService
    ){}  

    @Post('/login')
    async login(@Body(new ValidationPipe()) body: LoginUserDto):Promise<AuthPayload> {
        const { user, balance } = await this.authservice.login(body)
        const tokens = await this.tokenService.getTokens(user)
        return {
            message: "Login Successful",
            data: {
                user,
                balance: balance.balance,
                tokens
            }
        }     
    }

    @Post('/logout')
    @UseGuards(JwtAuthGuard)
    async logout(@Req() req) {
        const { userId } = req.user
        await this.authservice.logout(userId)
        return {
            message: `User with ID: ${userId} Logout Successful`,
            data: {
                user: null
            }
        }
    }
}