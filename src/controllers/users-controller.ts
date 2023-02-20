import { Request, Response } from "express";
import httpStatus from "http-status";
import { AutenticateRequest } from "../middlewares/authentication-middleware";
import usersService, { UpdateUserParams } from "../services/users-service";
import { CreateUserParams } from "../services/users-service";

export async function createUser(req: Request, res: Response) {
 const user = req.body as CreateUserParams;
 try {
  await usersService.createUser(user);
  res.sendStatus(httpStatus.CREATED);
 } catch (e) {
  if (e.name == "NotFoundError") {
   return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (e.name == "DuplicatedEmailError") {
   return res.sendStatus(httpStatus.CONFLICT);
  }
 }
}

export async function updateUser(req: AutenticateRequest, res: Response) {
 const userId = req.userId;
 const user = req.body as UpdateUserParams;
 try {
  await usersService.updateUser(user, userId);
  res.sendStatus(httpStatus.OK);
 } catch (e) {
  if (e.name == "DuplicatedEmailError") {
   return res.sendStatus(httpStatus.CONFLICT);
  }
 }
}
