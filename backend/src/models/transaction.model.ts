import {
  Field,
  GraphQLISODateTime,
  ID,
  Int,
  ObjectType,
  registerEnumType,
} from "type-graphql";
import { Category } from "./category.model.js";

export enum TransactionType {
  EXPENSE = "EXPENSE",
  REVENUE = "REVENUE",
}

registerEnumType(TransactionType, {
  name: "TransactionType",
});

@ObjectType()
export class Transaction {
  @Field(() => ID)
  id!: string;

  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  @Field(() => Int)
  amountInCents!: number;

  /** Valor monetário derivado de `amountInCents`. */
  @Field(() => Number)
  amount!: number;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => ID)
  userId!: string;

  @Field(() => ID)
  categoryId!: string;

  @Field(() => GraphQLISODateTime)
  createdAt!: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt!: Date;

  @Field(() => Category)
  category!: Category;
}
