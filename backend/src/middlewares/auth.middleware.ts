import type { MiddlewareFn } from "type-graphql";
import type { GraphQLContext } from "../graphql/context.js";

export const isAuthenticated: MiddlewareFn<GraphQLContext> = (
  { context },
  next
) => {
  if (!context.userId) {
    throw new Error("Unauthorized");
  }
  return next();
};
