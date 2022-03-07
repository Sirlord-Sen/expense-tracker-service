import { EntityRepository, Repository } from "typeorm";
import { Expense } from "../entity/expense.entity";

@EntityRepository(Expense)
export class ExpenseRepository extends Repository<Expense>{
    
}