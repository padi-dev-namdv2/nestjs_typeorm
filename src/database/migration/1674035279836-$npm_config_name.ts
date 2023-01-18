import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class $npmConfigName1674035279836 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rolepermissions",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "roleId",
                    type: "int",
                },
                {
                    name: "permissionId",
                    type: "int"
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()'
                }
            ]
        }), true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rolepermissions");
    }

}
