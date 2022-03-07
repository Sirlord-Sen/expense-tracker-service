import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { pick } from 'lodash'
import { UserService } from "src/user/services/user.service";
import { Balance } from "../entity/balance.entity";
import { Expense } from "../entity/expense.entity";
import { ICreateExpense } from "../interfaces/expense.interface";
import { ExpenseRepository } from "../repository/expense.repository";
import { BalanceService } from "./balance.service";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseRepository) 
        private expenseRepository: ExpenseRepository,
        private balanceService: BalanceService,
        private userService: UserService
    ) {}

    async createExpense(body: ICreateExpense, userId: string): Promise<Expense>{
        const { balance } = await this.userService.findOne({id: userId})
        this.confirmBalance(balance, body)
        return await this.expenseRepository.createExpense(body)
    }

    confirmBalance(b: Balance, expense: ICreateExpense){
        const { balance } = b
        if(balance < expense.amount) throw new ConflictException("Not Enough Balance")
    }

}    