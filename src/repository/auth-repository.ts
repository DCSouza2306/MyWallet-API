import prisma from "../database/database";



async function findById(userId: number){
    return prisma.users.findFirst({
        where: {
            id: userId
        }
    })
}

const authRepository = {
 findById
};

export default authRepository;
