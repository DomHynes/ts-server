import { Request, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import config from "../config/config";
import { JWTPayload, CustomResponse } from "../types";
import { getRepository } from "typeorm";
import { User } from "../entities/User";
import asyncHandler from "./asyncHandler";

export const checkJwt = asyncHandler(
  async (req: Request, res: CustomResponse<JWTPayload>, next: NextFunction) => {
    //Get the jwt token from the head
    if (!req.headers.authorization && !req.cookies.token) {
      res.status(401).send();
      return;
    }

    let token: string;

    if (req.headers.authorization) {
      token = req.headers.authorization.split("Bearer ")[1];
    }

    if (req.cookies.token) {
      token = req.cookies.token;
    }

    let payload: JWTPayload;

    //Try to validate the token and get data
    try {
      payload = jwt.verify(token, config.jwtSecret) as JWTPayload;
    } catch (error) {
      console.warn({error})
      //If token is not valid, respond with 401 (unauthorized)
      res.status(401).send();
      return;
    }

    res.locals = payload;
    const { id } = payload;

    const userRepository = getRepository(User);
    const user: User = await userRepository.findOneOrFail(id, {
      select: ["id", "username", "roles"]
    });

    const newToken = user.createJWT();

    res.setHeader("token", newToken);
    next();
    return;
  }
);
