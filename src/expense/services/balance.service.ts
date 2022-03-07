import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { pick } from 'lodash'
import { Balance } from "../entity/balance.entity";
import { ICreateExpense } from "../interfaces/expense.interface";
import { BalanceRepository } from "../repository/balance.repository";
import { ExpenseRepository } from "../repository/expense.repository";

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(BalanceRepository) 
        private balanceRepository: BalanceRepository,
    ) {}

    async createBalance(): Promise<Balance>{
        return await this.balanceRepository.createBalance()
    }

}    