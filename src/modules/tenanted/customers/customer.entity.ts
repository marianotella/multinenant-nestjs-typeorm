import { Column, Entity } from 'typeorm'
import { CustomBaseEntity } from '../../../commons/base.entity'

@Entity({ name: 'customers' })
export class Customer extends CustomBaseEntity {
  @Column()
    name: string
}
