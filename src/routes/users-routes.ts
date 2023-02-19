import { Router } from "express";
import { createUser, updateUser } from "../controllers/users-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-body-middleware";
import { userSchema } from "../models/user-schema";

const usersRoutes = Router();

usersRoutes
 .post("/sign-up", validateBody(userSchema), createUser)
 .put("/", authenticateToken, validateBody(userSchema), updateUser)

export default usersRoutes;