import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpenseController } from './controllers/expense.controllers';
import { BalanceRepository } from './repository/balance.repository';
import { ExpenseRepository } from './repository/expense.repository';
import { BalanceService } from './services/balance.service';
import { ExpenseService } from './services/expense.service';

@Global()
@Module({
  controllers: [ ExpenseController ],
  providers: [ ExpenseService, BalanceService ],
  imports: [
    TypeOrmModule.forFeature([ExpenseRepository, BalanceRepository]),
  ],
  exports: [BalanceService],
})
export class ExpenseModule {}
