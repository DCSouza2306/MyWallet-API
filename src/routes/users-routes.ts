import { Router } from "express";
import { createUser, updateUser } from "../controllers/users-controller";
import { authenticateToken } from "../middlewares/authentication-middleware";
import { validateBody } from "../middlewares/validate-body-middleware";
import { userSchema, userUpdateSchema } from "../models/user-schema";

const usersRoutes = Router();

usersRoutes
 .post("/sign-up", validateBody(userSchema), createUser)
 .put("/", authenticateToken, validateBody(userUpdateSchema), updateUser)

export default usersRoutes;