import { Router } from "express";
import { createUser } from "../controllers/users-controller";
import { validateBody } from "../middlewares/validate-body-middleware";
import { userSchema } from "../models/user-schema";

const usersRoutes = Router();

usersRoutes
 .post("/sign-up", validateBody(userSchema), createUser)

export default usersRoutes;