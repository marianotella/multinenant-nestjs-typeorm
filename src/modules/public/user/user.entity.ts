import { Entity, Column, ManyToOne } from 'typeorm'
import { TeamEntity } from '../team/team.entity'
import { CustomBaseEntity } from '../../../commons/base.entity'

export enum USER_STATUS {
  ACIVE = 1,
  INACTIVE = 2,
  SUSPENDED = 3,
}

export enum USER_ROLE {
  SUPERADMIN = 1,
  ADMIN = 2,
  AE = 3,
}

@Entity({ schema: 'public', name: 'users' })
export class UserEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255 })
    first_name: string

  @Column({ type: 'varchar', length: 255 })
    last_name: string

  @Column({ type: 'varchar', length: 255, unique: true })
    email: string

  @Column({ type: 'varchar', length: 255 })
    password: string

  @Column({
    name: 'status',
    type: 'enum',
    enum: USER_STATUS,
    default: USER_STATUS.ACIVE
  })
    status: string

  @Column({
    name: 'role',
    type: 'enum',
    enum: USER_ROLE,
    default: USER_ROLE.SUPERADMIN
  })
    role: string

  @ManyToOne(() => TeamEntity, (team) => team.users)
    team: TeamEntity[]
}
