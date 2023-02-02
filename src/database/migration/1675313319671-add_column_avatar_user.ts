import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class addColumnAvatarUser1675313319671 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `users` add `avatar` varchar(255) NULL after `password`");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "avatar");
    }

}
