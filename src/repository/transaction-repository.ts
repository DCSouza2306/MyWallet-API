import prisma from "../database/database";
import { CreateTransactionsParams } from "../services/transaction-service";

async function createTransaction(
 params: CreateTransactionsParams,
 userId: number
) {
 return prisma.transactions.create({
  data: { ...params, userId },
 });
}

async function getAll(userId: number) {
 return prisma.transactions.findMany({
  where: {
   id: userId,
  },
  select: {
   id: true,
   value: true,
   description: true,
   dateTransaction: true,
   type: true,
  },
 });
}

async function updateTransaction(
 params: CreateTransactionsParams,
 transactionId: number
) {
 return prisma.transactions.update({
  where: { id: transactionId },
  data: params,
 });
}

async function findById(id: number) {
 return prisma.transactions.findFirst({
  where: { id },
 });
}

async function deleteTransaction(id: number) {
 return prisma.transactions.delete({
  where: {
   id,
  },
 });
}



const transactionRepository = {
 createTransaction,
 getAll,
 updateTransaction,
 findById,
 deleteTransaction
};

export default transactionRepository;
