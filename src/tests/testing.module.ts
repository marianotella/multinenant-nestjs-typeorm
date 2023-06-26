import { Test, TestingModule } from '@nestjs/testing'
import { createTestingModule } from './test.utils'
import { ModuleMetadata } from '@nestjs/common'
import { TypeOrmHelper } from './type-orm.helper'
import { Fixture } from './interfaces'
import { TestDataSource } from './test.source'
import { TenancyModule } from '../modules/tenancy/tenancy.module'
import { AuthModule } from '../modules/public/auth/auth.module'
import { UsersModule } from '../modules/public/user/users.module'
import { CustomersModule } from '../modules/tenanted/customers/customers.module'

interface TestingModuleOptions extends ModuleMetadata {
  fixtures?: Fixture[];
}

export const testingModule = async ({
  imports,
  providers,
  controllers,
  exports,
  fixtures
}: TestingModuleOptions): Promise<TestingModule> => {
  const options: TestingModuleOptions = {
    imports: [
      ...(await createTestingModule()),
      TenancyModule,
      AuthModule,
      UsersModule,
      CustomersModule
    ]
  }

  if (imports) {
    options.imports = [...options.imports, ...imports]
  }

  if (controllers) {
    options.controllers = controllers
  }

  if (providers) {
    options.providers = providers
  }

  if (exports) {
    options.exports = exports
  }

  const module: TestingModule = await Test.createTestingModule(
    options
  ).compile()

  await TestDataSource.manager.connection.dropDatabase()
  await TestDataSource.manager.connection.runMigrations()

  if (fixtures) {
    await TypeOrmHelper.loadFixtures(module, fixtures)
  }

  return module
}
