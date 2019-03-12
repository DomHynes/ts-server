import { MigrationInterface, getRepository } from "typeorm";
import { User } from "../entity/User";

export class CreateAdminUser1547919837483 implements MigrationInterface {
    public async up(): Promise<void> {
        let user = new User();
        user.username = "admin";
        user.password = "admin";
        user.hashPassword();
        user.role = "ADMIN";
        const userRepository = getRepository(User);
        await userRepository.save(user);
    }

    public async down(): Promise<void> {}
}
