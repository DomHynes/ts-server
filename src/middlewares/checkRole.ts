import { Request, Response, NextFunction } from 'express';

import { User } from '../entities/User';

export const checkRole = (roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database

    let user: User;
    try {
      user = await User.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }

    //Check if array of authorized roles includes the user's role
    if (roles.some(role => user.roles.indexOf(role) > -1)) next();
    else res.status(401).send();
  };
};
