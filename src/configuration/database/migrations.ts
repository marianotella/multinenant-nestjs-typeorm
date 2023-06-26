import { getTenantConnection } from '../../modules/tenancy/tenancy.utils'
import { AppDataSource } from './source'

export const runMigrations = async () => {
  await AppDataSource.manager.connection.runMigrations()

  const schemas = await AppDataSource.manager.query(
    "select schema_name as name from information_schema.schemata where schema_name like 'tenant_%';"
  )

  const schemasToArray = schemas.map((schema: { name: string }) => schema.name)

  for (let i = 0; i < schemasToArray.length; i += 1) {
    const schema = schemasToArray[i]
    const tenantId = schema.replace('tenant_', '')
    const tenantConnection = await getTenantConnection(tenantId)
    await tenantConnection.runMigrations()
    await tenantConnection.destroy()
  }
}
