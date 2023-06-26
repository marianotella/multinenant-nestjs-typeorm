import { randomUUID } from 'crypto'
import { Fixture } from '../../../../interfaces/configuration.interface'
import { TeamEntity } from '../../team/team.entity'
import { UserEntity } from '../user.entity'

export const usersFixture: Fixture[] = [
  {
    entity: TeamEntity,
    data: [
      {
        id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        name: 'njl',
        code: 'njl',
        subdomain: 'https://njl.cydens.com',
        created_by: 1
      }
    ]
  },
  {
    entity: UserEntity,
    data: [
      {
        id: randomUUID(),
        email: 'marianotellaeche@gmail.com',
        first_name: 'Mariano',
        last_name: 'Tellaeche',
        password: 'njl',
        team: {
          id: 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11'
        }
      }
    ]
  }
]
