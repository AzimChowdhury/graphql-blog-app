import { PrismaClient } from ".prisma/client";
import bcrypt, { hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { jwtHelper } from "../utils/jwtHelper";

const prisma = new PrismaClient();
interface userInfo {
  name: string;
  email: string;
  password: string;
  bio?: string;
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
      const isExist = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (isExist) {
        return {
          token: null,
          message: "Email already exist",
        };
      }

      const hashedPassword = await bcrypt.hash(args.password, 12);
      const newUser = await prisma.user.create({
        data: {
          name: args.name,
          email: args.email,
          password: hashedPassword,
        },
      });

      if (args.bio) {
        await prisma.profile.create({
          data: {
            bio: args.bio,
            userId: newUser.id,
          },
        });
      }

      const token = await jwtHelper(newUser.id);

      return {
        token,
        message: "user created successfully",
      };
    },
    signin: async (parent: any, args: userInfo, context: any) => {
      const user = await prisma.user.findFirst({
        where: {
          email: args.email,
        },
      });
      if (!user) {
        return {
          message: "user not found",
          token: null,
        };
      } else {
        const isPasswordMatched = await bcrypt.compare(
          args.password,
          user.password
        );
        if (!isPasswordMatched) {
          return {
            message: "wrong password",
            token: null,
          };
        } else {
          const token = await jwtHelper(user.id);
          return {
            token,
            message: "user logged in successfully",
          };
        }
      }
    },
  },
};
