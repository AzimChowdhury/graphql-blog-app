import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema";
import { resolvers } from "./resolvers";
import { PrismaClient } from "@prisma/client";
import { getUserInfoFromToken } from "./utils/jwtHelper";
export const prisma = new PrismaClient();

(async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req }) => {
      const userId = await getUserInfoFromToken(
        req.headers.authorization as string
      );

      return {
        prisma,
        userId,
      };
    },
  });

  console.log(`🚀  Server ready at: ${url}`);
})();
