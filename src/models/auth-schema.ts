import joi from "joi"
import { InputUserParams } from "../services/auth-service"

export const authSchema = joi.object<InputUserParams>({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()
})