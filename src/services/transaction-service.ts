import { notFoundError } from "../errors/not-found-error";
import { transactionType } from "@prisma/client";
import transactionRepository from "../repository/transaction-repository";
import usersRepository from "../repository/users-repository";
import { forbiddenError } from "../errors/forbidden-error";

async function createTransaction(
 params: CreateTransactionsParams,
 userId: number
) {
 await validateUser(userId);

 await transactionRepository.createTransaction(params, userId);
}

async function getAll(userId: number) {
 await validateUser(userId);

 const transactions = await transactionRepository.getAll(userId);
 return transactions;
}
async function updateTransaction(
 params: CreateTransactionsParams,
 userId: number,
 transactionId: number
) {
 await validateUser(userId);

 const transaction = await validateTransaction(transactionId);

 if (transaction.userId != userId) {
  throw forbiddenError();
 }

 await transactionRepository.updateTransaction(params, transactionId);
}

async function getById(transactionId: number, userId: number) {
 await validateUser(userId);

 const transaction = await validateTransaction(transactionId);

 if (transaction.userId != userId) {
  throw forbiddenError();
 }
 return transaction;
}

async function deleteTransaction(transactionId: number, userId: number) {
 await validateUser(userId);

 const transaction = await validateTransaction(transactionId);

 if (transaction.userId != userId) {
  throw forbiddenError();
 }

 await transactionRepository.deleteTransaction(transactionId);
}

async function validateUser(userId: number) {
 const user = await usersRepository.findById(userId);
 if (!user) {
  throw notFoundError();
 }
}

async function validateTransaction(transactionId: number) {
 const transaction = await transactionRepository.findById(transactionId);
 if (!transaction) {
  throw notFoundError();
 }
 return transaction;
}

const transactionService = {
 createTransaction,
 getAll,
 updateTransaction,
 deleteTransaction,
 getById,
};

export type CreateTransactionsParams = {
 value: number;
 type: transactionType;
 description: string;
 dateTransaction: Date;
};

export default transactionService;
