import { Body, Controller, Get, Post } from '@nestjs/common'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './customer.entity'
import { CustomersService } from './customers.service'

@Controller('customers')
export class CustomersController {
  constructor (private readonly customersService: CustomersService) {}

  @Post()
  create (@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersService.create(createCustomerDto)
  }

  @Get()
  findAll (): Promise<Customer[]> {
    return this.customersService.findAll()
  }
}
