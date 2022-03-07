import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { CreateExpenseDto, ExpensePayload } from "../dtos/expense.dto";
import { BalanceService } from "../services/balance.service";
import { ExpenseService } from "../services/expense.service";

@ApiTags('Expenses Actions')
@Controller('/api/v1/expense')
export class ExpenseController{
    constructor(
        private expenseService: ExpenseService,
        private balanceService: BalanceService
    ){}
    
    @Post('/create')
    @UseGuards(JwtAuthGuard)
    async createExpense(@Req() req, @Body(new ValidationPipe()) body: CreateExpenseDto): Promise<ExpensePayload>{
        const { userId } = req.user
        const expense = await this.expenseService.createExpense(body, userId)
        const balance = await this.balanceService.updateBalance(expense, userId)
        return {
            message: "Expense Created",
            data: {
                balance: balance.balance,
                expense
            }
        }
    }
}