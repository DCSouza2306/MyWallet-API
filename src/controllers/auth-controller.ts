import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { CreateUserParams, InputUserParams } from "../services/auth-service";


export async function createUser(req: Request, res: Response){
    const user = req.body as CreateUserParams
    try{
        await authService.createUser(user);
        res.status(httpStatus.CREATED)
    } catch(e) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function loginUser(req: Request, res: Response){
    const user = req.body as InputUserParams

    try{
        const userData = await authService.loginUser(user)
        res.status(httpStatus.OK).send(userData)
    } catch(e) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}

