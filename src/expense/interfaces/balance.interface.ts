import { Expense } from "../entity/expense.entity"

export interface IBalance{
    id?: string
    total?: number
    balance?:number
    expense?: Expense
    created_at?:Date
    update_at?:Date
}