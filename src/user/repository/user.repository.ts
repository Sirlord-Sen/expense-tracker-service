import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { Balance } from 'src/expense/entity/balance.entity';
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { ICreateUser } from '../interfaces/user.interface';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(data:ICreateUser, balance: Balance): Promise<User>{
    try {
      const user = this.create(data);
      user.balance = balance
      await this.save(user);
      return user;
    } 
    catch (err) { 
        if (err.code === '23505' || 'ER_DUP_ENTRY') throw new ConflictException('Email already exist')
        throw new InternalServerErrorException('User could not be saved')
    }
  }
}
