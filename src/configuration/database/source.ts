import { DataSource, DataSourceOptions } from 'typeorm'
import { ormConfig } from './orm.config'
import { tenantsOrmconfig } from './tenants-orm.config'

export const AppDataSource = new DataSource({
  ...(ormConfig() as DataSourceOptions)
})

export const TenantDataSource = new DataSource({
  ...(tenantsOrmconfig as DataSourceOptions),
  name: 'tenant'
})
