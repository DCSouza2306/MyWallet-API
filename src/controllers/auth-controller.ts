import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { CreateUserParams } from "../services/auth-service";


export async function createUser(req: Request, res: Response){
    const user = req.body as CreateUserParams
    try{
        await authService.createUser(user);
        res.status(httpStatus.CREATED)
    } catch(e) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}

