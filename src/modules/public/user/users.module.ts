import { Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserEntity } from './user.entity'
import { UsersController } from './users.controller'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
