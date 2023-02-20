import { AutenticateRequest } from "../middlewares/authentication-middleware";
import { Response } from "express";
import httpStatus from "http-status";
import transactionService, {
 CreateTransactionsParams,
} from "../services/transaction-service";

export async function createTransaction(
 req: AutenticateRequest,
 res: Response
) {
 const transaction = req.body as CreateTransactionsParams;
 const userId = req.userId;

 try {
  await transactionService.createTransaction(transaction, userId);
  res.sendStatus(httpStatus.CREATED);
 } catch (e) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function getAll(req: AutenticateRequest, res: Response) {
 const userId = req.userId;
 try {
  const transactions = await transactionService.getAll(userId);
  res.status(httpStatus.OK).send(transactions);
 } catch (e) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function updateTransaction(
 req: AutenticateRequest,
 res: Response
) {
 const userId = req.userId;
 const { transactionId } = req.params;
 const transaction = req.body as CreateTransactionsParams;
 try {
  await transactionService.updateTransaction(
   transaction,
   userId,
   parseInt(transactionId)
  );
  res.sendStatus(httpStatus.OK);
 } catch (e) {
  if (e.name == "NotFoundError") {
   return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (e.name == "ForbiddenError") {
   return res.sendStatus(httpStatus.FORBIDDEN);
  }
 }
}

export async function deleteTransaction(
 req: AutenticateRequest,
 res: Response
) {
 const userId = req.userId;
 const { transactionId } = req.params;
 try {
  await transactionService.deleteTransaction(userId, parseInt(transactionId));
 } catch (e) {
  if (e.name == "NotFoundError") {
   return res.sendStatus(httpStatus.NOT_FOUND);
  }

  if (e.name == "ForbiddenError") {
   return res.sendStatus(httpStatus.FORBIDDEN);
  }
 }
}

export async function getById(req: AutenticateRequest, res: Response){
    const userId = req.userId
    const {transactionId} = req.params
    try{
        const transaction = await transactionService.getById(parseInt(transactionId), userId);
        res.status(httpStatus.OK).send(transaction)
    } catch(e) {
        res.sendStatus(httpStatus.NOT_FOUND)
    }
}
