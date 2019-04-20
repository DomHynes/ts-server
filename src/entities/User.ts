import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
  BaseEntity,
  OneToMany,
} from 'typeorm';
import { Length, IsEmail } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { AccountIntegration } from './AccountIntegration';
import { Bot } from './Bot';
import { Command } from './Command';

@Entity()
@Unique(['username'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  @Length(4, 20)
  public username: string;

  @Column()
  @Length(4, 100)
  public password: string;

  @Column()
  @IsEmail()
  public email: string;

  @Column('simple-array')
  public roles: string[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;

  @OneToMany(() => AccountIntegration, accountintegration => accountintegration.user)
  public integrations: AccountIntegration[];

  @OneToMany(() => Bot, bot => bot.user)
  public bots: Bot[];

  @OneToMany(() => Command, command => command.user)
  public commands: Command[];

  public hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  public checkIfUnencryptedPasswordIsValid(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }

  public createJWT(): string {
    const { id, username, roles } = this;
    return jwt.sign({ id, username, roles }, config.jwtSecret, {
      expiresIn: '1h',
    });
  }
}
