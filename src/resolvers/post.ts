import { userLoader } from "../dataLoaders/userLoader";

export const Post = {
  author: async (parent: any, args: any, { prisma, userId }: any) => {
    return userLoader.load(parent.authorId);
  },
};
