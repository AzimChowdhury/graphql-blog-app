export const checkingUser = async (
  prisma: any,
  userId: string,
  postId: string
) => {
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
      id: postId,
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
};
