import usersRepository from "../repository/users-repository";
import bcrypt from "bcrypt";
import { duplicatedEmail } from "../errors/duplicated-email";


async function createUser(params: CreateUserParams) {
 await validateUniqueEmail(params.email);

 const passwordHash = bcrypt.hashSync(params.password, 10);

 const user = { ...params, password: passwordHash };

 await usersRepository.createUser(user);
}

async function validateUniqueEmail(email: string) {
 const userExist = await usersRepository.findUserByEmail(email);
 if (userExist) {
  throw duplicatedEmail();
 }
}

const usersService = {
    createUser
};

export default usersService

export type CreateUserParams = {
 name: string;
 email: string;
 password: string;
 url_image: string;
};
