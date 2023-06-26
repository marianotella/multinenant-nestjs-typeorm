import { join } from 'path'
import { DataSourceOptions } from 'typeorm'
import { SnakeNamingStrategy } from '../configuration/database/snake-naming.strategy'

export const testOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'postgres',
  namingStrategy: new SnakeNamingStrategy(),
  logging: false,
  entities: [join(__dirname, './../modules/public/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './../migrations/public/*{.ts,.js}')]
}

export const testTenantsOrmconfig = {
  ...testOrmConfig,
  entities: [join(__dirname, './../modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './../migrations/tenanted/*{.ts,.js}')]
}
