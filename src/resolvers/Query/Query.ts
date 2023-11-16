export const Query = {
  me: async (parent: any, args: any, { prisma, userId }: any) => {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    return user;
  },

  profile: async (parent: any, args: any, { prisma, userId }: any) => {
    return await prisma.profile.findUnique({
      where: {
        userId: args.userId,
      },
    });
  },

  users: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.user.findMany();
  },
  posts: async (parent: any, args: any, { prisma }: any) => {
    return await prisma.post.findMany({
      where: {
        published: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });
  },
};
