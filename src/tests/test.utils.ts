import { TypeOrmModule } from '@nestjs/typeorm'
import { DynamicModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { testConfiguration } from './test.configuration'
import { UserEntity } from '../modules/public/user/user.entity'
import { TeamEntity } from '../modules/public/team/team.entity'
import { testOrmConfig, testTenantsOrmconfig } from './orm.config'
import { TestDataSource, TestTenantDataSource } from './test.source'

const ENTITIES = [UserEntity, TeamEntity]

export async function createTestingModule (): Promise<DynamicModule[]> {
  return [
    ConfigModule.forRoot({ load: [testConfiguration] }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => testOrmConfig,
      dataSourceFactory: async (options) => {
        return TestDataSource.isInitialized
          ? TestDataSource
          : TestDataSource.setOptions(options).initialize()
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => testTenantsOrmconfig,
      dataSourceFactory: async (options) => {
        return TestTenantDataSource.setOptions(options)
      }
    }),

    TypeOrmModule.forFeature(ENTITIES)
  ]
}

export const databaseDestroy = async () => {
  await TestDataSource.destroy()
  await TestTenantDataSource.destroy()
}
