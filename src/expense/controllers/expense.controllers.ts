import { Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { ValidationPipe } from "src/common/pipes/validation.pipe";
import { AllExpensesPayload, CreateExpenseDto, ExpensePayload } from "../dtos/expense.dto";
import { BalanceService } from "../services/balance.service";
import { ExpenseService } from "../services/expense.service";

@ApiTags('Expenses Actions')
@Controller('/api/v1/expenses')
export class ExpenseController{
    constructor(
        private expenseService: ExpenseService,
        private balanceService: BalanceService
    ){}
    
    @Post('/')
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

    @Get('/')
    @UseGuards(JwtAuthGuard)
    async getAll(@Req() req): Promise<AllExpensesPayload>{
        const { userId } = req.user
        const { balance, expenses } = await this.balanceService.findAll({id: userId})
        return {
            message: "All Expenses",
            data: {
                balance: balance.balance,
                expenses
            }
        }
    }
}