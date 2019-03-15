import { Request, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../entities/User";

import { CustomResponse, JWTPayload } from "../types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const checkRole = (requestedOperations: string[]) => {
  return async (req: Request, res: CustomResponse<JWTPayload>, next: NextFunction) => {

    const id = res.locals.id;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
    } catch (id) {
      res.status(401).send();
    }



    //Check if array of authorized roles includes the user's role
    if (roles.some(role => user.roles.indexOf(role) > -1)) next();
    else res.status(401).send();
  };
};
