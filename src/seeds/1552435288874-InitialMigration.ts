import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../entities/User';

export class InitialMigration1552435288874 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const user = new User();
    user.username = 'admin';
    user.password = 'admin';
    user.hashPassword();
    user.roles = ['ADMIN'];
    const userRepository = queryRunner.connection.getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
