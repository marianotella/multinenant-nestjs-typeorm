import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ormConfig } from './configuration/database/orm.config'
import { ConfigModule } from '@nestjs/config'
import { configuration } from './configuration/configuration'
import {
  AppDataSource,
  TenantDataSource
} from './configuration/database/source'
import { tenantsOrmconfig } from './configuration/database/tenants-orm.config'
import { CustomersModule } from './modules/tenanted/customers/customers.module'
import { TenancyModule } from './modules/tenancy/tenancy.module'
import { AuthModule } from './modules/public/auth/auth.module'
import { UsersModule } from './modules/public/user/users.module'
import { AuthGuard } from './modules/public/auth/auth.guard'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [
    ConfigModule.forRoot({ load: [configuration], isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => ormConfig(),
      dataSourceFactory: async (options) => {
        return AppDataSource.setOptions(options).initialize()
      }
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async () => tenantsOrmconfig,
      dataSourceFactory: async (options) => {
        return TenantDataSource.setOptions(options)
      }
    }),
    TenancyModule,
    AuthModule,
    UsersModule,
    CustomersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard
    }
  ]
})
export class AppModule {}
