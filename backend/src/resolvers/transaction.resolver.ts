import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import type { User as DbUser } from "@prisma/client";
import { TransactionInput } from "../dtos/input/transaction.input.js";
import { GqlUser } from "../graphql/decorators/gql-user.decorator.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { Transaction } from "../models/transaction.model.js";
import { TransactionService } from "../services/transaction.service.js";

@Resolver(() => Transaction)
@UseMiddleware(isAuthenticated)
export class TransactionResolver {
  constructor(private readonly transactionService = new TransactionService()) {}

  @FieldResolver(() => Number)
  amount(@Root() row: { amountInCents: number }) {
    return row.amountInCents / 100;
  }

  @Query(() => [Transaction])
  async transactions(@GqlUser() user: DbUser) {
    return this.transactionService.listByUser(user.id);
  }

  @Query(() => Transaction)
  async transaction(
    @GqlUser() user: DbUser,
    @Arg("transactionId", () => String) transactionId: string
  ) {
    return this.transactionService.findById(transactionId, user.id);
  }

  @Mutation(() => Transaction)
  async createTransaction(
    @GqlUser() user: DbUser,
    @Arg("input", () => TransactionInput) input: TransactionInput
  ) {
    return this.transactionService.create(input, user.id);
  }

  @Mutation(() => Transaction)
  async updateTransaction(
    @GqlUser() user: DbUser,
    @Arg("transactionId", () => String) transactionId: string,
    @Arg("input", () => TransactionInput) input: TransactionInput
  ) {
    return this.transactionService.update(transactionId, input, user.id);
  }

  @Mutation(() => Transaction)
  async deleteTransaction(
    @GqlUser() user: DbUser,
    @Arg("transactionId", () => String) transactionId: string
  ) {
    return this.transactionService.delete(transactionId, user.id);
  }
}
