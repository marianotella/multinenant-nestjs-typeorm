import { Global, Module, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import { Request as ExpressRequest } from 'express'
import { getTenantConnection } from './tenancy.utils'
import { CONNECTION } from './tenancy.symbols'

/**
 * Note that because of Scope Hierarchy, all injectors of this
 * provider will be request-scoped by default. Hence there is
 * no need for example to specify that a consuming tenant-level
 * service is itself request-scoped.
 * https://docs.nestjs.com/fundamentals/injection-scopes#scope-hierarchy
 */
@Global()
@Module({
  providers: [
    {
      provide: CONNECTION,
      scope: Scope.REQUEST,
      useFactory: async (request: ExpressRequest) => {
        const { tenantCode } = request

        if (tenantCode) {
          return getTenantConnection(tenantCode)
        }

        return null
      },
      inject: [REQUEST]
    }
  ],
  exports: [CONNECTION]
})
export class TenancyModule {}
