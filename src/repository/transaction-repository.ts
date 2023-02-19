import prisma from "../database/database";
import { CreateTransactionsParams } from "../services/transaction-service";
import { transactions } from "@prisma/client";

async function createTransaction(params: CreateTransactionsParams, userId: number){
    return prisma.transactions.create({
        data: {...params, userId}
    })
}

async function getAll(userId: number){
    return prisma.transactions.findMany({
        where: {
            id: userId
        },
        select: {
            id: true,
            value: true,
            description: true,
            dateTransaction: true,
            type: true
        }
    })
}

const transactionRepository = {
    createTransaction,
    getAll
}

export default transactionRepository