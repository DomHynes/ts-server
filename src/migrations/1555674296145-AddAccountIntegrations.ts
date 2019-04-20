import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAccountIntegrations1555674296145 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `CREATE TABLE "account_integration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "accessToken" character varying NOT NULL, "username" character varying NOT NULL, "refreshToken" character varying NOT NULL, "serviceId" character varying NOT NULL, "avatar" character varying NOT NULL, "service" integer NOT NULL, "userId" uuid, CONSTRAINT "PK_65a0763574565a2c52c48bdb0c4" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "account_integration" ADD CONSTRAINT "FK_f562c48538a1036c05c7f303046" FOREIGN KEY ("userId") REFERENCES "user"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      `ALTER TABLE "account_integration" DROP CONSTRAINT "FK_f562c48538a1036c05c7f303046"`,
    );
    await queryRunner.query(`DROP TABLE "account_integration"`);
  }
}
