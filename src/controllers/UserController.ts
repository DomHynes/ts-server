import { Request, Response } from 'express';

import { validate } from 'class-validator';

import { User } from '../entities/User';
import accesscontrol from '../config/AccessControl';
import { CustomResponse, JWTPayload, AuthenticatedRequest } from '../types';

class UserController {
  public static listAll = async (req: Request, res: Response) => {
    //Get users from database

    const users = await User.find({
      select: ['id', 'username', 'email', 'roles'], //We dont want to send the passwords on response
    });

    //Send the users object
    res.send({ users });
  };

  public static getOneById = async (req: AuthenticatedRequest, res: CustomResponse<JWTPayload>) => {
    //Get the ID from the url
    const id = req.params.id;

    const { granted } = accesscontrol
      .can(req.user.roles)
      .execute('read')
      .on('user');

    if (!granted) {
      res.status(401).send();
      return;
    }

    //Get the user from database

    try {
      const user = await User.findOneOrFail(id, {
        select: ['id', 'username', 'email', 'roles'], //We dont want to send the password on response
      });

      res.send({ user });
    } catch (error) {
      res.status(404).send('User not found');
    }
  };

  public static newUser = async (req: Request, res: Response) => {
    //Get parameters from the body
    let { username, password } = req.body;
    let user = new User();
    user.username = username;
    user.password = password;
    user.roles = ['USER'];

    //Validade if the parameters are ok
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Hash the password, to securely store on DB
    user.hashPassword();

    //Try to save. If fails, the username is already in use

    try {
      await User.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    //If all ok, send 201 response
    res.status(201).send({ user });
  };

  public static editUser = async (req: Request, res: CustomResponse<JWTPayload>) => {
    //Get the ID from the url
    const id = req.params.id;

    const permission = accesscontrol
      .can(res.locals.roles)
      .context({ requester: res.locals.id, owner: req.params.id })
      .execute('update')
      .on('user');

    if (!permission.granted) {
      res.status(401).send();
      return;
    }

    //Try to find user on database

    let user;
    try {
      user = await User.findOneOrFail(id);
    } catch (error) {
      //If not found, send a 404 response
      res.status(404).send('User not found');
      return;
    }

    Object.assign(user, req.body);
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    //Try to safe, if fails, that means username already in use
    try {
      await User.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }
    //After all send a 204 (no content, but accepted) response
    res.status(201).send({ user });
  };

  public static deleteUser = async (req: Request, res: Response) => {
    //Get the ID from the url
    const id = req.params.id;

    try {
      await User.findOneOrFail(id);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    User.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(204).send();
  };
}

export default UserController;
