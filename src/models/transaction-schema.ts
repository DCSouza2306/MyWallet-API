import joi from "joi";
import { CreateTransactionsParams } from "../services/transaction-service";

export const transactionSchema = joi.object<CreateTransactionsParams>({
    value: joi.number().required(),
    type: joi.string().allow("INCOME" || "EXPENSE"),
    description: joi.string().required(),
    dateTransaction: joi.date().required()
})