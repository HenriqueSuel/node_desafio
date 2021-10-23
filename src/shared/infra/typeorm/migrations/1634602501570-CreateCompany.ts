import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompany1634602501570 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "company",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "cnpj",
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
                        name: "name_company",
                        type: "varchar",
                    },
                    {
                        name: "owner_name",
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
        await queryRunner.dropTable("company");
    }

}
