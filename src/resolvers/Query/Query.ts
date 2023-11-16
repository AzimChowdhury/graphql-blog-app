import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const Query = {
  me: async (parent: any, args: any, context: any) => {
    const user = await prisma.user.findUnique({
      where: {
        id: context.userId,
      },
    });
    return user;
  },
  users: async (parent: any, args: any, context: any) => {
    return await prisma.user.findMany();
  },
};
