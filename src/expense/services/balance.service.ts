import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { UserService } from "src/user/services/user.service";
import { Balance } from "../entity/balance.entity";
import { Expense } from "../entity/expense.entity";
import { IBalance } from "../interfaces/balance.interface";
import { BalanceRepository } from "../repository/balance.repository";

@Injectable()
export class BalanceService {
    constructor(
        @InjectRepository(BalanceRepository) 
        private balanceRepository: BalanceRepository,
        private userService: UserService
    ) {}

    async createBalance(): Promise<Balance>{
        return await this.balanceRepository.createBalance()
    }

    async findOne(query: Partial<IBalance>): Promise<Balance>{
       try{ return this.balanceRepository.findOneOrFail({where: query, relations: ["expenses"]})} 
       catch(e){ throw new InternalServerErrorException() }
    }

    async updateBalance(expense: Expense, userId: string){
        const userBalance = (await this.userService.findOne({id: userId})).balance
        const balance = await this.findOne({id:userBalance.id})
        const bal = balance.balance - expense.amount
        const savedBalance = await this.balanceRepository.updateBalance({id: balance.id}, {balance: bal, expense})
        return savedBalance
    }

}    