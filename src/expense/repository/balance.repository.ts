import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Balance } from "../entity/balance.entity";
import { Expense } from "../entity/expense.entity";
import { IBalance } from "../interfaces/balance.interface";

@EntityRepository(Balance)
export class BalanceRepository extends Repository<Balance>{
    async createBalance(): Promise<Balance>{
        try{
            const balance = new Balance()
            await balance.save()
            return balance
        }
        catch(err){throw new InternalServerErrorException('Balance not be created')}
    }

    async updateBalance(query: Partial<IBalance>, body: IBalance): Promise<Balance>{
        try{
            const balance = await this.findOneOrFail({where: query, relations: ["expenses"]})
            balance.expenses.push(body.expense)
            this.merge(balance, {balance : body.balance})
            await balance.save()
            return balance
        }
        catch(e){throw new InternalServerErrorException('Could not update Balance')}
    }
}