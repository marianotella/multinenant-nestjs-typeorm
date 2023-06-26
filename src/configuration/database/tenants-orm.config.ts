import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from './orm.config'

import { join } from 'path'

export const tenantsOrmconfig = {
  ...ormConfig(),
  entities: [join(__dirname, './../../modules/tenanted/**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, './../../migrations/tenanted/*{.ts,.js}')]
} as TypeOrmModule
