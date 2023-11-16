import { checkingUser } from "../../utils/checkingUser";

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

    const error = await checkingUser(prisma, userId, args.postId);
    if (error) {
      return error;
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
  deletePost: async (parent: any, args: any, { prisma, userId }: any) => {
    if (!userId) {
      return {
        message: "Unauthorized",
        post: null,
      };
    }

    const error = await checkingUser(prisma, userId, args.postId);
    if (error) {
      return error;
    }

    const deletePost = await prisma.post.delete({
      where: {
        id: args.postId,
      },
    });

    return {
      message: "post updated successfully",
      post: deletePost,
    };
  },
};
