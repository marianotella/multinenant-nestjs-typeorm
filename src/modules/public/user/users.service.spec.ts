import { TestingModule } from '@nestjs/testing'
import { UsersService } from './users.service'

import { testingModule } from '../../../tests/testing.module'
import { usersFixture } from './fixtures/users.fixture'
import { UserEntity } from './user.entity'
import { databaseDestroy } from '../../../tests/test.utils'

describe('UserService', () => {
  let service: UsersService

  beforeEach(async () => {
    const module: TestingModule = await testingModule({
      providers: [UsersService],
      fixtures: usersFixture
    })

    service = module.get<UsersService>(UsersService)
  })

  afterAll(async () => {
    await databaseDestroy()
  })

  it('should be defined', async () => {
    expect(service).toBeDefined()
  })

  it('should be defined', async () => {
    const user = await service.findOne('marianotellaeche@gmail.com', 'njl')

    expect(user).toBeInstanceOf(UserEntity)
  })
})
