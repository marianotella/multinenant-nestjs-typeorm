import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export class MigrationName implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'MigrationName'

  public async up (queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions
    const tableName = 'table_name'

    const table = new Table({
      name: `${schema}.${tableName}`,
      schema,
      columns: [
        {
          name: 'id',
          type: 'uuid',
          isPrimary: true,
          isNullable: false
        },
        // ... other columns
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
    })

    await queryRunner.createTable(table)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions
    const tableName = 'table_name'

    await queryRunner.dropTable(`${schema}.${tableName}`)
  }
}
