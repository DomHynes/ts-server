import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';
import { User } from './User';
import { Bot } from './Bot';

@Entity()
export class Command extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, user => user.commands)
  public user: User;

  @ManyToMany(() => Bot, bot => bot.commands)
  public bots: Bot[];

  @Column()
  public trigger: string;

  @Column()
  public response: string;
}
