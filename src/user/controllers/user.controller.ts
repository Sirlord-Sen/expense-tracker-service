import { Controller, Post, Res, Body } from '@nestjs/common'
import { Response } from 'express'
import { UserService } from '../services/user.service'

@Controller('/api/v1/user')
export class UserController {
    constructor(
        private userService: UserService
    ){}  

    @Post('/signup')
    async signup(@Res() res: Response, @Body() body: any) {
        const user = await this.userService.signup(body)
        return res.json(user)
    }

}