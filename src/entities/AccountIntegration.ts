import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

export enum Service {
  Discord,
  Twitch,
}

@Entity()
export class AccountIntegration extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @ManyToOne(() => User, user => user.integrations)
  public user: User;

  @Column()
  public accessToken: string;

  @Column()
  public refreshToken: string;

  @Column()
  public serviceId: string;

  @Column()
  public username: string;

  @Column()
  public avatar: string;

  @Column('int')
  public service: Service;
}
