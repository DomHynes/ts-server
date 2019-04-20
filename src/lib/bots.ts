import { Client } from 'discord.js';
import config from '../config/config';
import { Bot } from '../entities/Bot';
import redis from './redis';

const bot = new Client();

bot.once('ready', () => console.warn('ready'));
bot.on('message', message => console.log(message.content));

bot.login(config.discord.multibotToken);

export const bootBot = () =>
  Bot.find({ relations: ['commands'] }).then(bots =>
    bots.map(bot => {
      const client = new Client();

      redis.setCommands(bot.id, bot.commands);

      client.on('message', async message => {
        const commands = await redis.getCommands(bot.id);

        commands.forEach(command => {
          if (message.content === command.trigger) {
            message.channel.send(command.response);
          }
        });
      });

      client.login(bot.token);

      return client;
    }),
  );
