import { Router } from "express";
import MeController from "../controllers/MeController";
import { checkJwt } from "../middlewares/checkJwt";

const router = Router();

router.get("/details", [checkJwt], MeController.details);

export default router;
