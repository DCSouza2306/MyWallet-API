import prisma from "../database/database";
import { CreateUserParams } from "../services/users-service";

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


const usersRepository = {
    findUserByEmail,
    createUser
   };
   
   export default usersRepository;