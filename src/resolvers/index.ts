import { PrismaClient } from ".prisma/client";

const prisma = new PrismaClient();
interface userInfo {
  name: string;
  email: string;
  password: string;
}

export const resolvers = {
  Query: {
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
  },
  Mutation: {
    signup: async (parent: any, args: userInfo, context: any) => {
      return await prisma.user.create({
        data: args,
      });
    },
  },
};
