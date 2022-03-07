import { InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { Balance } from "../entity/balance.entity";

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
}