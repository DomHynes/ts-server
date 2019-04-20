import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { User } from './User';
import { Command } from './Command';

@Entity()
export class Bot extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, user => user.bots)
  public user: User;

  @ManyToMany(() => Command, command => command.bots)
  @JoinTable()
  public commands: Command[];

  @Column()
  public clientId: string;

  @Column()
  public clientSecret: string;

  @Column()
  public token: string;
}
