import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1786156484718 implements MigrationInterface {
    name = 'Init1786156484718'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "pacientes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fechaNacimiento" date, "tipoSangre" character varying(10), "contactoEmergencia" character varying(255), "direccion" character varying(255), "telefono" character varying(50), "userId" uuid, CONSTRAINT "REL_1e08e2368106ee357a62a28744" UNIQUE ("userId"), CONSTRAINT "PK_aa9c9f624ff22fc06c44d8b1609" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD "documentoIdentidad" character varying(50)`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_11d4eb83898131c38d2a89595aa" UNIQUE ("documentoIdentidad")`);
        await queryRunner.query(`ALTER TABLE "users" ADD "role" character varying(50) NOT NULL DEFAULT 'paciente'`);
        await queryRunner.query(`ALTER TABLE "pacientes" ADD CONSTRAINT "FK_1e08e2368106ee357a62a287447" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pacientes" DROP CONSTRAINT "FK_1e08e2368106ee357a62a287447"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_11d4eb83898131c38d2a89595aa"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "documentoIdentidad"`);
        await queryRunner.query(`DROP TABLE "pacientes"`);
    }

}
