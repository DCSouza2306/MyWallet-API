import authRepository from "../repository/auth-repository";
import bcrypt from "bcrypt";
import { duplicatedEmail } from "../errors/duplicated-email";

async function createUser(user: CreateUserParams) {
 await validateUniqueEmail(user.email);

 const passwordHash = bcrypt.hashSync(user.password, 10);

 user = { ...user, password: passwordHash };

 await authRepository.createUser(user);
}

async function validateUniqueEmail(email: string) {
 const userExist = await authRepository.findUserByEmail(email);
 if (userExist) {
  throw duplicatedEmail();
 }
}

const authService = {
 createUser,
};

export type CreateUserParams = {
 name: string;
 email: string;
 password: string;
 url_image: string;
};

export default authService;
