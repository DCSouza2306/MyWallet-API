import { Request, Response } from "express";
import httpStatus from "http-status";
import authService, { InputUserParams } from "../services/auth-service";



export async function loginUser(req: Request, res: Response){
    const user = req.body as InputUserParams

    try{
        const userData = await authService.loginUser(user)
        res.status(httpStatus.OK).send(userData)
    } catch(e) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}

