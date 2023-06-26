import { TestingModule } from '@nestjs/testing'
import { getRepositoryToken } from '@nestjs/typeorm'
import { Fixture } from './interfaces'

export class TypeOrmHelper {
  static loadFixtures = async (
    module: TestingModule,
    fixtures: Fixture[]
  ): Promise<void> => {
    for (const fixture of fixtures) {
      const repository = module.get(getRepositoryToken(fixture.entity))

      for (const item of fixture.data) {
        await repository.save(item)
      }
    }
  }
}
