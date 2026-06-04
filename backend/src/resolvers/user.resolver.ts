import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import type { User as DbUser } from "@prisma/client";
import { GqlUser } from "../graphql/decorators/gql-user.decorator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { User } from "../models/user.model.js";
import { UpdateUserInput } from "../dtos/input/update-user.input.js";
import { prisma } from "../lib/prisma.js";
import { hashPassword } from "../utils/hash.js";

@Resolver(() => User)
@UseMiddleware(isAuthenticated)
export class UserResolver {
  @Query(() => User)
  me(@GqlUser() user: DbUser): User {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }

  @Mutation(() => User)
  async updateUser(
    @Arg("input", () => UpdateUserInput) input: UpdateUserInput,
    @GqlUser() user: DbUser
  ): Promise<User> {
    const data: { name?: string; password?: string } = {};
    if (input.name) data.name = input.name;
    if (input.password) data.password = await hashPassword(input.password);

    const updated = await prisma.user.update({
      where: { id: user.id },
      data,
    });

    return {
      id: updated.id,
      name: updated.name,
      email: updated.email,
      createdAt: updated.createdAt,
      updatedAt: updated.updatedAt,
    };
  }
}
