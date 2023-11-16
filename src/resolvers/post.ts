export const Post = {
  author: async (parent: any, args: any, { prisma, userId }: any) => {
    return await prisma.user.findUnique({
      where: {
        id: parent.authorId,
      },
    });
  },
};
