import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity'
import { RefreshToken } from 'src/auth/entity/refreshToken.entity'
import { UserSubscriber } from 'src/user/subscriber/user.subscriber';
import { Expense } from 'src/expense/entity/expense.entity';
import { Balance } from 'src/expense/entity/balance.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // host: process.env.DB_HOST,
  // username: process.env.DB_USERNAME,
  // password: process.env.DB_PASSWORD,
  // port: 5432,
  // database: 'widget-demo-app',

  synchronize: true,
  entities: [User, RefreshToken, Expense, Balance],
  subscribers: [UserSubscriber],
  type: 'postgres',


  url: process.env.DATABASE_URL,
  ssl: true,
  extra: {
    ssl: { rejectUnauthorized: false },
  },
};
