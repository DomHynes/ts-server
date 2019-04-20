import * as Redis from 'ioredis';
import { Command } from '../entities/Command';

class RedisClient {
  private redis = new Redis();

  public setCommands = (botId: string, commands: Command[]) =>
    this.redis.set(botId, JSON.stringify(commands));

  public getCommands = (botId: string): Promise<Command[]> =>
    new Promise(async res => {
      const messages = await this.redis.get(botId);
      res(JSON.parse(messages));
    });
}

export default new RedisClient();
