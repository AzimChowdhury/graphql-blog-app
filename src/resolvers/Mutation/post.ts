export const postResolvers = {
  addPost: async (parent: any, args: any, { prisma, userId }: any) => {
    if (!userId) {
      return {
        message: "Unauthorized",
        post: null,
      };
    }
    if (!args.title || !args.content) {
      return {
        message: "title and content are required",
        post: null,
      };
    }

    const newPost = await prisma.post.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: userId,
      },
    });

    return {
      message: "post created successfully",
      post: newPost,
    };
  },
};
