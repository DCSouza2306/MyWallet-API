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

async function findById(userId: number){
    return prisma.users.findFirst({
        where: {
            id: userId
        }
    })
}

const authRepository = {
 createUser,
 findUserByEmail,
 findById
};

export default authRepository;
