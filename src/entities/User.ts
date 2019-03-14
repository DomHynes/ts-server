import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn
} from "typeorm";
import { Length } from "class-validator";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import config from "../config/config";

@Entity()
@Unique(["username"])
export class User {
  @PrimaryGeneratedColumn("uuid")
  public id: string;

  @Column()
  @Length(4, 20)
  public username: string;

  @Column()
  @Length(4, 100)
  public password: string;

  @Column("simple-array")
  public roles: string[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  public createJWT(): string {
    const { id, username, roles } = this;
    return jwt.sign({id, username, roles}, config.jwtSecret, {expiresIn: '1h'});
  }
}
