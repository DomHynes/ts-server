import { validate } from 'class-validator';
import { Response } from 'express';
import { Bot } from '../entities/Bot';
import { AuthenticatedRequest } from '../types';
import redis from '../lib/redis';
import { Command } from '../entities/Command';

class BotController {
  public static new = async (req: AuthenticatedRequest, res: Response) => {
    //Get parameters from the body
    let { clientId, clientSecret, token } = req.body;
    const bot = Bot.create({
      clientId,
      clientSecret,
      token,
    });

    //Validade if the parameters are ok
    const errors = await validate(bot);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await bot.save();
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ bot });
  };

  public static list = async (req: AuthenticatedRequest, res: Response) => {
    const bots = await Bot.find({ relations: ['commands'] });

    res.json({ bots });
  };

  public static addCommand = async (req: AuthenticatedRequest, res: Response) => {
    const bot = await Bot.findOneOrFail({ id: req.params.bot });
    bot.commands = req.body.commands.map(id => ({ id }));
    await bot.save();

    const commands = await Command.find({ where: req.body.commands.map(id => ({ id })) });

    redis.setCommands(bot.id, commands);

    res.json({ bot });
  };
}

export default BotController;
