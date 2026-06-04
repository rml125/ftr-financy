import { createParameterDecorator } from "type-graphql";
import { prisma } from "../../lib/prisma.js";
import type { GraphQLContext } from "../context.js";

export function GqlUser() {
  return createParameterDecorator<GraphQLContext>(
    async ({ context }: { context: GraphQLContext }) => {
      if (!context.userId) {
        throw new Error("Unauthorized");
      }
      const user = await prisma.user.findUnique({
        where: { id: context.userId },
      });
      if (!user) {
        throw new Error("User not found");
      }
      return user;
    }
  );
}
