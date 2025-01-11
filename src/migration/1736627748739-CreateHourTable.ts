import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHourTable1736627748739 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')

        await queryRunner.createTable(
            new Table({
                name: 'hours',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'relevant_day',
                        type: 'date',
                        isNullable: false,
                    },
                    {
                        name: 'started_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'paused_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'returned_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'ended_at',
                        type: 'timestamp',
                        isNullable: true,
                    },
                    {
                        name: 'totalHours',
                        type: 'varchar',
                        isNullable: true,
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('hours');
    }

}
