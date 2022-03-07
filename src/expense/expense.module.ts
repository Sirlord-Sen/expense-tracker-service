import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './controllers/expense.controllers';
import { Balance } from './entity/balance.entity';
import { Expense } from './entity/expense.entity';

@Global()
@Module({
  controllers: [ ExpenseController ],
  providers: [],
  imports: [
    TypeOrmModule.forFeature([Expense, Balance]),
  ],
  exports: [],
})
export class ExpenseModule {}
