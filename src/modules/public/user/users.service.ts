import { Injectable } from '@nestjs/common'
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

@Injectable()
export class UsersService {
  constructor (
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>
  ) {}

  async find () {
    return this.userRepository.find()
  }

  async findOne (email: string, tenantCode: string): Promise<UserEntity> {
    return this.userRepository
      .createQueryBuilder('users')
      .innerJoin('users.team', 'teams')
      .where('users.email = :email', { email })
      .andWhere('teams.code = :tenantCode', { tenantCode })
      .getOne()
  }
}
