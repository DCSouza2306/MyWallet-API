import joi from "joi"
import { CreateUserParams } from "../services/auth-service"

export const userSchema = joi.object<CreateUserParams>({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    url_image: joi.string().required()
})