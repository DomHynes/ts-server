import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/User';

export class InitialMigration1552435288874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.username = 'admin';
    user.password = 'admin';
    user.hashPassword();
    user.roles = ['ADMIN'];
    user.email = 'admin@example.com';
    const UserRepository = queryRunner.connection.getRepository(User);
    await UserRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
