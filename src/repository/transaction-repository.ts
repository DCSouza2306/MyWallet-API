import prisma from "../database/database";
import { CreateTransactionsParams } from "../services/transaction-service";
import { transactions } from "@prisma/client";

async function createTransaction(params: CreateTransactionsParams, userId: number){
    return prisma.transactions.create({
        data: {...params, userId}
    })
}

const transactionRepository = {
    createTransaction
}

export default transactionRepository