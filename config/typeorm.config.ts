import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../src/user/entity/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  port: 5432,
  database: 'widget-demo-app',

  synchronize: true,
  entities: [User],
  type: 'postgres',


  // url: process.env.DATABASE_URL,
  // ssl: true,
  // extra: {
  //   ssl: { rejectUnauthorized: false },
  // },
};
