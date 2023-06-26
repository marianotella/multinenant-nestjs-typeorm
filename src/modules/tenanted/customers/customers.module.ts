import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Customer } from './customer.entity'
import { CustomersController } from './customers.controller'
import { CustomersService } from './customers.service'

@Module({
  imports: [TypeOrmModule.forFeature([Customer])],
  providers: [CustomersService],
  controllers: [CustomersController]
})
export class CustomersModule {}
