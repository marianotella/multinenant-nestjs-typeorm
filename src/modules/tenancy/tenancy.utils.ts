import { DataSource, DataSourceOptions } from 'typeorm'
import {
  AppDataSource,
  TenantDataSource
} from '../../configuration/database/source'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export async function getTenantConnection (
  tenantCode: string
): Promise<DataSource> {
  const connectionName = `tenant_${tenantCode}`
  const options = TenantDataSource.driver.options as PostgresConnectionOptions

  if (TenantDataSource.isInitialized && options.schema !== connectionName) {
    await TenantDataSource.destroy()
  }

  const schema = await AppDataSource.manager.query(
    `select schema_name as name from information_schema.schemata where schema_name = '${connectionName}';`
  )

  if (!schema.length) {
    throw new Error('Schema not found')
  }

  const connection = TenantDataSource.setOptions({
    schema: connectionName
  } as DataSourceOptions)

  return connection.isInitialized
    ? Promise.resolve(connection)
    : connection.initialize()
}
