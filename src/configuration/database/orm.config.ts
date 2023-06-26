import { join } from 'path'
import { SnakeNamingStrategy } from './snake-naming.strategy'
import { configuration } from '../configuration'
import { DataSourceOptions } from 'typeorm'
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config()

export const ormConfig = (): DataSourceOptions => {
  const config = configuration()

  return {
    type: 'postgres',
    host: config.database.host,
    port: config.database.port,
    username: config.database.username,
    password: config.database.password,
    database: config.database.database,
    namingStrategy: new SnakeNamingStrategy(),
    logging: true,
    entities: [join(__dirname, './../../modules/public/**/*.entity{.ts,.js}')],
    migrations: [join(__dirname, './../../migrations/public/*{.ts,.js}')]
  }
}
