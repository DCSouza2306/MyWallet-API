import authRepository from "../repository/auth-repository";
import bcrypt from "bcrypt";
import { duplicatedEmail } from "../errors/duplicated-email";
import { invalideCredentialsError } from "../errors/invalid-credentials-error";
import jwt from "jsonwebtoken"
import sessionRepository from "../repository/session-repository";

async function loginUser(params: InputUserParams){
    const user = await findUserOrFail(params.email)
    await validatePassword(params.password, user.password)

    const token = await createSession(user.id)
    return {
        token,
        url_image: user.url_image,
        name: user.name,
        email: user.email
    }
}

async function findUserOrFail(email: string){
    const userExist = await authRepository.findUserByEmail(email)
    if(!userExist){
        throw invalideCredentialsError()
    }
    return userExist;
}

async function validatePassword(incomingPassword: string, userPassword: string){
    const passwordIsVallid = await bcrypt.compare(incomingPassword, userPassword);
    if(!passwordIsVallid) throw invalideCredentialsError()
}

async function createSession(userId: number){
    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    await sessionRepository.create(userId, token);
    return token
}


const authService = {
 loginUser
};



export type InputUserParams = {
    email: string;
    password: string;
}

export default authService;
