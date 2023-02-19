import { AutenticateRequest } from "../middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import transactionService, { CreateTransactionsParams } from "../services/transaction-service";

export async function createTransaction(req: AutenticateRequest, res: Response){
    const transaction = req.body as CreateTransactionsParams
    const userId = req.userId

    try{
        await transactionService.createTransaction(transaction, userId)
        res.sendStatus(httpStatus.CREATED)
    } catch(e){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}

export async function getAll(req: AutenticateRequest, res: Response){
    const userId = req.userId
    try{
        const transactions = await transactionService.getAll(userId);
        res.status(httpStatus.OK).send(transactions)
    } catch(e){
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}