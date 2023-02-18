import { Router } from "express";
import { createUser, loginUser } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validate-body-middleware";
import { authSchema } from "../models/auth-schema";
import { userSchema } from "../models/user-schema";

const authRoutes = Router();

authRoutes
 .post("/sign-up", validateBody(userSchema), createUser)
 .post("login", validateBody(authSchema), loginUser);

export default authRoutes;
