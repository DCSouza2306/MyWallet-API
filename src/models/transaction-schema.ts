import joi from "joi"

export const transactionSchema = joi.object({
    value: joi.number().required(),
    type: joi.string().allow("INCOME" || "EXPENSE"),
    description: joi.string().required(),
    dateTransaction: joi.date().required()

})