/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const { join } = require('path')
const colors = require('colors/safe')

const MIGRATION_TYPES = ['public', 'tenanted']

const migrationPath = join(__dirname, './../src/migrations/')
const publicPath = join(migrationPath, '/public/')
const tenantedPath = join(migrationPath, '/tenanted/')
const basePublicMigration = join(__dirname, './basePublicMigration.ts')
const baseTenantMigration = join(__dirname, './baseTenantMigration.ts')
const time = new Date().getTime()

const capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
}

const returnError = (err) => {
  const line = ''.padStart(err.length, '-')
  if (err) {
    console.error(colors.red(line))
    console.error(colors.bgRed(err))
    console.error(colors.red(line))
  }
}

const returnSuccess = (err) => {
  const line = ''.padStart(err.length, '-')
  if (err) {
    console.error(colors.green(line))
    console.error(colors.bgGreen(err))
    console.error(colors.green(line))
  }
}

const createMigration = (migrationName, basePath, baseMigrationPath) => {
  const name = capitalize(migrationName)
  const data = fs.readFileSync(baseMigrationPath, 'utf8')
  const fullName = `${time}-${name}.migration.ts`
  const content = data.replace(/MigrationName/gi, `${capitalize(name)}${time}`)

  fs.writeFile(`${basePath}${fullName}`, content, (err) => {
    return err
      ? returnError(err)
      : returnSuccess(`Migración ${basePath}${fullName} creada con éxito`)
  })
}

const runMigration = () => {
  const migrationType = process.argv[2]
  const migrationName = process.argv[3]

  if (!MIGRATION_TYPES.includes(migrationType)) {
    const errorMessage = `Tipo de migración no especificado o incorrecto, debe ser ${MIGRATION_TYPES.map(
      (type) => `"${type}"`
    ).join(', ')}`
    returnError(errorMessage)
    return
  }

  if (!migrationName) {
    returnError('Nombre de la migración no especificado')
    return
  }

  if (migrationType === 'public') { return createMigration(migrationName, publicPath, basePublicMigration) }
  if (migrationType === 'tenanted') { return createMigration(migrationName, tenantedPath, baseTenantMigration) }
}

runMigration()
