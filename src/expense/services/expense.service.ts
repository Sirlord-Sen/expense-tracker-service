import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm"
import { pick } from 'lodash'
import { ICreateExpense } from "../interfaces/expense.interface";
import { ExpenseRepository } from "../repository/expense.repository";

@Injectable()
export class ExpenseService {
    constructor(
        @InjectRepository(ExpenseRepository) 
        private expenseRepository: ExpenseRepository,
    ) {}

    async createExpense(body: ICreateExpense){
        return body
    }

}    