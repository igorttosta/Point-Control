import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

export class CreateUserFkHourTable1736628850186 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('hours', new TableColumn({
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
        }));

        await queryRunner.createForeignKey('hours', new TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('hours');
        const foreignKey = table?.foreignKeys.find(fk => fk.columnNames.includes('user_id'));
        if (foreignKey) {
            await queryRunner.dropForeignKey('hours', foreignKey);
        }

        await queryRunner.dropColumn('hours', 'user_id');
    }

}