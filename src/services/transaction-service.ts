import { notFoundError } from "../errors/not-found-error";
import authRepository from "../repository/auth-repository";
import { transactionType } from "@prisma/client";
import transactionRepository from "../repository/transaction-repository";

async function createTransaction(params: CreateTransactionsParams, userId: number){
    await validateUser(userId)

    await transactionRepository.createTransaction(params,userId)

}

async function getAll(userId: number){
    await validateUser(userId)

    const transactions = await transactionRepository.getAll(userId)
    return transactions

}

async function validateUser(userId: number){
    const user = await authRepository.findById(userId);
    if(!user){
        throw notFoundError()
    }
}


const transactionService = {
createTransaction,
getAll
}



export type CreateTransactionsParams = {
    value: number,
    type: transactionType,
    description: string
    dateTransaction: Date,
}


export default transactionService