import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";

@ApiTags('Expenses Actions')
@Controller('/api/v1/expense')
export class ExpenseController{
    constructor(

    ){}
    
    @Post('/create')
    async createExpense(@Body() body: any){
        console.log(body)
    }
}