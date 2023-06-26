import { Inject, Injectable } from '@nestjs/common'
import { DataSource, Repository } from 'typeorm'
import { CreateCustomerDto } from './dto/create-customer.dto'
import { Customer } from './customer.entity'
import { CONNECTION } from '../../tenancy/tenancy.symbols'

@Injectable()
export class CustomersService {
  private readonly customersRepository: Repository<Customer>

  constructor (@Inject(CONNECTION) connection: DataSource) {
    this.customersRepository = connection.getRepository(Customer)
  }

  async create (createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customersRepository.create(createCustomerDto).save().finally()
  }

  async findAll (): Promise<Customer[]> {
    return this.customersRepository.find()
  }
}
