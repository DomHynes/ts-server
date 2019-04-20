import { validate } from 'class-validator';
import { Response } from 'express';
import { Command } from '../entities/Command';
import { AuthenticatedRequest } from '../types';

class CommandController {
  public static new = async (req: AuthenticatedRequest, res: Response) => {
    //Get parameters from the body
    let { trigger, response } = req.body;
    console.log({ trigger, response });
    const command = Command.create({
      trigger,
      response,
      user: req.user,
    });

    //Validade if the parameters are ok
    const errors = await validate(command);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    try {
      await command.save();
    } catch (e) {
      console.log(e.message);
      res.status(409).send('username already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ command });
  };

  public static list = async (req: AuthenticatedRequest, res: Response) => {
    const commands = await Command.find();

    res.json({ commands });
  };
}

export default CommandController;
