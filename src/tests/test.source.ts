import { DataSource, DataSourceOptions } from 'typeorm'
import { testOrmConfig, testTenantsOrmconfig } from './orm.config'

export const TestDataSource = new DataSource({
  ...(testOrmConfig as DataSourceOptions)
})

export const TestTenantDataSource = new DataSource({
  ...(testTenantsOrmconfig as DataSourceOptions)
})
