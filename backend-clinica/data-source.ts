import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { User } from './src/users/entities/user.entity';
import { Paciente } from './src/users/entities/paciente.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Paciente],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
