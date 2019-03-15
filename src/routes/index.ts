import { Router } from "express";
import auth from "./auth";
import user from "./user";
import me from './me';

const routes = Router();

routes.use("/auth", auth);
routes.use("/users", user);
routes.use("/me", me);

export default routes;
