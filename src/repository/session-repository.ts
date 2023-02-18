import prisma from "../database/database";

async function create(userId: number, token: string) {
 return prisma.sessions.create({
  data: {
   userId,
   token,
  },
 });
}

const sessionRepository = {
    create
};

export default sessionRepository;
