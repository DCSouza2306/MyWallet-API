import { Router } from "express";
import { loginUser } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validate-body-middleware";
import { authSchema } from "../models/auth-schema";

const authRoutes = Router();

authRoutes
 .post("", validateBody(authSchema), loginUser);

export default authRoutes;
