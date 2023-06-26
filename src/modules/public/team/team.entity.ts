import { Entity, Column, OneToMany } from 'typeorm'
import { UserEntity } from '../user/user.entity'
import { CustomBaseEntity } from '../../../commons/base.entity'

export enum TEAM_STATUS {
  ACIVE = 1,
  INACTIVE = 2,
  SUSPENDED = 3,
}

@Entity({ schema: 'public', name: 'teams' })
export class TeamEntity extends CustomBaseEntity {
  @Column({ type: 'varchar', length: 255 })
    name: string

  @Column({ type: 'varchar', length: 255, unique: true })
    code: string

  @Column({ type: 'varchar', length: 255, unique: true })
    subdomain: string

  @Column({
    name: 'status',
    type: 'enum',
    enum: TEAM_STATUS,
    default: TEAM_STATUS.ACIVE
  })
    status: string

  @Column({ name: 'created_by', type: 'integer' })
    created_by: number

  @Column({ name: 'updated_by', type: 'integer', nullable: true })
    updated_by: number

  @OneToMany(() => UserEntity, (user) => user.team)
    users: UserEntity[]
}
