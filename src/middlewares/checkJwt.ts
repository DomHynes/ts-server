import { Request, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { JWTPayload, CustomResponse } from '../types';

import { User } from '../entities/User';
import asyncHandler from './asyncHandler';

export const checkJwt = asyncHandler(
  async (req: Request, res: CustomResponse<JWTPayload>, next: NextFunction) => {
    //Get the jwt token from the head
    if (!req.headers.authorization && !req.cookies.token) {
      res.status(401).send();
      return;
    }

    let token: string;

    if (req.headers.authorization) {
      token = req.headers.authorization.split('Bearer ')[1];
    }

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    let payload: JWTPayload;

    //Try to validate the token and get data
    try {
      payload = jwt.verify(token, config.jwtSecret) as JWTPayload;
    } catch (error) {
      console.warn({ error });
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    const user: User = await User.findOneOrFail(payload.id, {
      select: ['id', 'username', 'roles'],
    });

    res.locals = user;

    const newToken = user.createJWT();

    res.setHeader('token', newToken);
    next();
    return;
  },
);
