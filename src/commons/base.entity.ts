import { randomUUID } from 'crypto'
import {
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  PrimaryColumn,
  BeforeInsert
} from 'typeorm'

export class CustomBaseEntity extends BaseEntity {
  @PrimaryColumn()
    id: string

  @CreateDateColumn()
    created_at: Date

  @UpdateDateColumn()
    updated_at: Date

  @BeforeInsert()
  generateUUID () {
    this.id = randomUUID()
  }
}
