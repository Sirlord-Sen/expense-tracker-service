import { Controller, Post, Res, Body } from '@nestjs/common'

@Controller('/api/v1/auth')
export class AuthController {
    constructor(

    ){}  

    @Post('/login')
    async login(@Res() response, @Body() user: Omit<any, 'fullname'>) {
       
    }
}