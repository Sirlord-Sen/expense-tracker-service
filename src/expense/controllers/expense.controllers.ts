import { Body, Controller, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { CreateExpenseDto } from "../dtos/expense.dto";
import { ExpenseService } from "../services/expense.service";

@ApiTags('Expenses Actions')
@Controller('/api/v1/expense')
export class ExpenseController{
    constructor(
        private expenseService: ExpenseService,
    ){}
    
    @Post('/create')
    async createExpense(@Body(new ValidationPipe()) body: CreateExpenseDto){
        const expense = await this.expenseService.createExpense(body)
        return expense
    }
}