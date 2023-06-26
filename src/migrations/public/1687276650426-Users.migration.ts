import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class Users1687276650426 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'Users1687276650426'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true
          },
          {
            name: 'first_name',
            type: 'varchar(255)'
          },
          {
            name: 'last_name',
            type: 'varchar(255)'
          },
          {
            name: 'email',
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
            name: 'role',
            type: 'enum',
            enum: ['SUPERADMIN', 'ADMIN', 'AE'],
            default: "'SUPERADMIN'"
          },
          {
            name: 'team_id',
            type: 'uuid',
            isNullable: true
          },
          {
            name: 'password',
            type: 'varchar(255)'
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
    await queryRunner.dropTable('users')
  }
}
