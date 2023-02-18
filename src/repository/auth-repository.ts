import prisma from "../database/database";
import { CreateUserParams } from "../services/auth-service";

async function createUser(user: CreateUserParams) {
 return prisma.users.create({
  data: user,
 });
}

async function findUserByEmail(email: string) {
 return prisma.users.findFirst({
  where: {
   email,
  },
 });
}

const authRepository = {
 createUser,
 findUserByEmail,
};

export default authRepository;
