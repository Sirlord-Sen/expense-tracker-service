import { Balance } from "../entity/balance.entity"
import { Expense } from "../entity/expense.entity"

export interface IBalance{
    id?: string
    total?: number
    balance?:number
    expense?: Expense
    created_at?:Date
    update_at?:Date
}

export interface IAllExpenses{
    expenses: Expense[],
    balance: Partial<Balance>
}