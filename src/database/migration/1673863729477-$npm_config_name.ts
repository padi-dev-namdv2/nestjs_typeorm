import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class $npmConfigName1673863729477 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: "name",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "guard",
                    type: "varchar",
                },
                {
                    name: 'role_id',
                    type: 'int',
                    default: '0'
                },
                {
                    name: 'created_at',
                    type: 'datetime',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'datetime',
                    default: 'now()',
                },
            ]
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
