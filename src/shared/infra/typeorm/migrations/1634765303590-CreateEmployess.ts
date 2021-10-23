import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateEmployess1634765303590 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "employees",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isUnique: true
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
                        name: "full_name",
                        type: "varchar",
                    },
                    {
                        name: "phone",
                        type: "varchar",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("employees");
    }
}
