import { Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

import { validate } from 'class-validator';

import { User } from '../entities/User';
import config from '../config/config';

class AuthController {
  public static login = async (req: Request, res: Response) => {
    //Check if username and password are set
    let { username: reqUsername, password: reqPassword } = req.body;
    if (!(reqUsername && reqPassword)) {
      res.status(400).send();
    }

    //Get user from database

    let user: User;
    try {
      user = await User.findOneOrFail({
        where: { username: reqUsername },
      });
    } catch (error) {
      res.status(401).send();
    }

    //Check if encrypted password match
    if (!user || !user.checkIfUnencryptedPasswordIsValid(reqPassword)) {
      res.status(401).send();
      return;
    }

    const { id, username, roles } = user;

    //Sing JWT, valid for 1 hour
    const token = jwt.sign({ id, username, roles }, config.jwtSecret, {
      expiresIn: '1h',
    });

    //Send the jwt in the response
    res
      .cookie('jwt', token, {
        maxAge: 3600000,
      })
      .json({ token });
  };

  public static changePassword = async (req: Request, res: Response) => {
    //Get ID from JWT
    const id = res.locals.jwtPayload.userId;

    //Get parameters from the body
    const { oldPassword, newPassword } = req.body;
    if (!(oldPassword && newPassword)) {
      res.status(400).send();
    }

    //Get user from the database

    let user: User;
    try {
      user = await User.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if old password matchs
    if (!user.checkIfUnencryptedPasswordIsValid(oldPassword)) {
      res.status(401).send();
      return;
    }

    //Validate de model (password lenght)
    user.password = newPassword;
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }
    //Hash the new password and save
    user.hashPassword();
    User.save(user);

    res.status(204).send();
  };
}
export default AuthController;
