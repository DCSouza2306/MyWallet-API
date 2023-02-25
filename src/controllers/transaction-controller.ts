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
  transaction.dateTransaction = new Date(transaction.dateTransaction);
  await transactionService.createTransaction(transaction, userId);
  res.sendStatus(httpStatus.CREATED);
 } catch (e) {
  console.log(e);
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}

export async function getAll(req: AutenticateRequest, res: Response) {
 const userId = req.userId;
 const { month, year } = req.query as Record<string, string>;
 try {
  const transactions = await transactionService.getAll(
   userId,
   parseInt(month),
   parseInt(year)
  );
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
  transaction.dateTransaction = new Date(transaction.dateTransaction);
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
  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
 }
}

export async function deleteTransaction(
 req: AutenticateRequest,
 res: Response
) {
 const userId = req.userId;
 const { transactionId } = req.params;
 try {
  await transactionService.deleteTransaction(parseInt(transactionId),userId);
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

export async function getById(req: AutenticateRequest, res: Response) {
 const userId = req.userId;
 const { transactionId } = req.params;
 try {
  const transaction = await transactionService.getById(
   parseInt(transactionId),
   userId
  );
  res.status(httpStatus.OK).send(transaction);
 } catch (e) {
  res.sendStatus(httpStatus.NOT_FOUND);
 }
}
