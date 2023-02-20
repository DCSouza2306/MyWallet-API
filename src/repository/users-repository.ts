import dayjs from "dayjs";
import prisma from "../database/database";
import { CreateUserParams, UpdateUserParams } from "../services/users-service";

async function createUser(user: CreateUserParams) {
 return prisma.users.create({
  data: user,
 });
}

async function findById(userId: number) {
 return prisma.users.findFirst({
  where: {
   id: userId,
  },
 });
}

async function updateUser(params: UpdateUserParams, userId: number){
    return prisma.users.update({
        where: { id: userId},
        data: {...params, updatedAt: dayjs().toISOString()}
    })
}

const usersRepository = {
 createUser,
 findById,
 updateUser
};

export default usersRepository;
