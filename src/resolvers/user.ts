export const User = {
  posts: async (parent: any, args: any, { prisma, userId }: any) => {
    const isMyProfile = parent.id === userId;
    if (isMyProfile) {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
        },
      });
    } else {
      return await prisma.post.findMany({
        where: {
          authorId: parent.id,
          published: true,
        },
      });
    }
  },
};
