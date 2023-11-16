export const Query = {
  me: async (parent: any, args: any, context: any) => {
    const user = await context.prisma.user.findUnique({
      where: {
        id: context.userId,
      },
    });
    return user;
  },

  users: async (parent: any, args: any, context: any) => {
    return await context.prisma.user.findMany();
  },
};
