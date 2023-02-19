import usersRepository from "../repository/users-repository";
import bcrypt from "bcrypt";
import { duplicatedEmail } from "../errors/duplicated-email";
import authRepository from "../repository/auth-repository";
import { notFoundError } from "../errors/not-found-error";

async function createUser(params: CreateUserParams) {
 await validateUniqueEmail(params.email);

 const passwordHash = bcrypt.hashSync(params.password, 10);

 const user = { ...params, password: passwordHash };

 await usersRepository.createUser(user);
}

async function updateUser(params: UpdateUserParams, userId: number) {
 const user = await usersRepository.findById(userId);
 if (!user) {
  throw notFoundError();
 }

 if (user.email == params.email) {
  delete params.email;
  await usersRepository.updateUser(params, userId);
 } else {
  await validateUniqueEmail(params.email);
  await usersRepository.updateUser(params, userId);
 }
}

async function validateUniqueEmail(email: string) {
 const userExist = await authRepository.findUserByEmail(email);
 if (userExist) {
  throw duplicatedEmail();
 }
}

const usersService = {
 createUser,
 updateUser,
};

export default usersService;

export type CreateUserParams = {
 name: string;
 email: string;
 password: string;
 url_image: string;
};

export type UpdateUserParams = {
 name: string;
 email: string;
 url_image: string;
};
