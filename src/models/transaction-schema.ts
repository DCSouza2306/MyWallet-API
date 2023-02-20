import joi from "joi";
import { CreateTransactionsParams } from "../services/transaction-service";

export const transactionSchema = joi.object<CreateTransactionsParams>({
    value: joi.number().required(),
    type: joi.string().valid("income", "expense").required(),
    description: joi.string().required(),
    dateTransaction: joi.string().isoDate().required()
})