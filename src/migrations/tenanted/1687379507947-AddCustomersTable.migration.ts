import { MigrationInterface, QueryRunner, Table } from 'typeorm'
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions'

export class Addcustomerstable1687379507947 implements MigrationInterface {
  // eslint-disable-next-line @typescript-eslint/typedef
  name = 'Addcustomerstable1687379507947'

  public async up (queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions

    await queryRunner.createTable(
      new Table({
        schema,
        name: 'customers',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true
          },
          {
            name: 'name',
            type: 'varchar'
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
      })
    )
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    const { schema } = queryRunner.connection
      .options as PostgresConnectionOptions

    await queryRunner.dropTable(
      new Table({
        schema,
        name: 'customers'
      }),
      true
    )
  }
}
