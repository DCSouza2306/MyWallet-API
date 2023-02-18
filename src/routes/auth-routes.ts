import { Router } from "express";
import { createUser } from "../controllers/auth-controller";
import { validateBody } from "../middlewares/validate-body-middleware";
import { authSchema } from "../models/auth-schema";
import { userSchema } from "../models/user-schema";

const authRoutes = Router()

authRoutes.post("/sign-in", validateBody(userSchema), createUser)

export default authRoutes