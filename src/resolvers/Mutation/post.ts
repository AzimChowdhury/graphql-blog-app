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
  updatePost: async (parent: any, args: any, { prisma, userId }: any) => {
    if (!userId) {
      return {
        message: "Unauthorized",
        post: null,
      };
    }
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return {
        message: "User not found",
        post: null,
      };
    }

    const post = await prisma.post.findUnique({
      where: {
        id: args.postId,
      },
    });

    if (!post) {
      return {
        message: "Post does not exist",
        post: null,
      };
    }

    if (post.authorId !== user.id) {
      return {
        message: "Unauthorized",
        post: null,
      };
    }

    const updatePost = await prisma.post.update({
      where: {
        id: args.postId,
      },
      data: {
        title: args.title,
        content: args.content,
      },
    });

    return {
      message: "post updated successfully",
      post: updatePost,
    };
  },
};
