import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Teams1687276655889 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'Teams1687276655889'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teams',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'name',
            type: 'varchar(255)'
          },
          {
            name: 'subdomain',
            type: 'varchar(255)',
            isUnique: true
          },
          {
            name: 'code',
            type: 'varchar(255)',
            isUnique: true
          },
          {
            name: 'status',
            type: 'enum',
            enum: ['ACTIVE', 'INACTIVE', 'SUSPENDED'],
            default: "'ACTIVE'"
          },
          {
            name: 'created_by',
            type: 'integer'
          },
          {
            name: 'updated_by',
            type: 'integer',
            isNullable: true
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()'
          }
        ]
      }),
      true,
      true,
      true
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('teams')
  }
}
