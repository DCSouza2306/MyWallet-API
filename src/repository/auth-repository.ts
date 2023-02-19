import prisma from "../database/database";



async function findUserByEmail(email: string) {
    return prisma.users.findFirst({
     where: {
      email,
     },
    });
   }

const authRepository = {
 findUserByEmail
};

export default authRepository;
