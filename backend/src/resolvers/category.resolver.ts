import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import type { User as DbUser } from "@prisma/client";
import { CategoryInput } from "../dtos/input/category.input.js";
import { GqlUser } from "../graphql/decorators/gql-user.decorator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { Category } from "../models/category.model.js";
import { CategoryService } from "../services/category.service.js";

@Resolver(() => Category)
@UseMiddleware(isAuthenticated)
export class CategoryResolver {
  constructor(private readonly categoryService = new CategoryService()) {}

  @Query(() => [Category])
  async categories(@GqlUser() _user: DbUser) {
    return this.categoryService.listByUser(_user.id);
  }

  @Query(() => Category)
  async category(
    @GqlUser() user: DbUser,
    @Arg("categoryId", () => String) categoryId: string
  ) {
    return this.categoryService.findById(categoryId, user.id);
  }

  @Mutation(() => Category)
  async createCategory(
    @GqlUser() user: DbUser,
    @Arg("input", () => CategoryInput) input: CategoryInput
  ) {
    return this.categoryService.create(input, user.id);
  }

  @Mutation(() => Category)
  async updateCategory(
    @GqlUser() user: DbUser,
    @Arg("categoryId", () => String) categoryId: string,
    @Arg("input", () => CategoryInput) input: CategoryInput
  ) {
    return this.categoryService.update(categoryId, input, user.id);
  }

  @Mutation(() => Category)
  async deleteCategory(
    @GqlUser() user: DbUser,
    @Arg("categoryId", () => String) categoryId: string
  ) {
    return this.categoryService.delete(categoryId, user.id);
  }
}
