import { Controller, Post, Res, Body } from '@nestjs/common'

@Controller('/api/v1/user')
export class UserController {
    constructor(
    ){}  

    @Post('/signup')
    async signup(@Res() response, @Body() user: any) {
 
    }

}