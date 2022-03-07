import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Expense } from "../entity/expense.entity";
import { ICreateExpense } from "../interfaces/expense.interface";

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense>{
    async createExpense(body: ICreateExpense): Promise<Expense>{
        try{
            const expense = this.create(body)
            await expense.save()
            return expense
        }
        catch(e) {throw new InternalServerErrorException('Could not save Expense')}
    }
}