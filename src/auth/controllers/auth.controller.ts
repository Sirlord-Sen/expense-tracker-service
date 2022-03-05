import { Controller, Post, Res, Body } from '@nestjs/common'
import { Response } from 'express';
import { ValidationPipe } from 'src/common/pipes/validation.pipe'
import { AuthPayload, LoginUserDto } from '../dtos/auth.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';

@Controller('/api/v1/auth')
export class AuthController {
    constructor(
        private authservice: AuthService,
        private tokenService: TokenService
    ){}  

    @Post('/login')
    async login(@Body(new ValidationPipe()) body: LoginUserDto):Promise<AuthPayload> {
        const user = await this.authservice.login(body)
        const tokens = await this.tokenService.getTokens(user)
        return {
            message: "Login Successful",
            data: {
                user: user,
                tokens: tokens
            }
        }     
    }

    @Post('/logout')
    async logout(@Res() res: Response) {
       return res.json({
        message: "Logout Successful",
        data: {
            user: null,
            tokens: null
        }
       })
    }
}