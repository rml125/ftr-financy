import { Field, GraphQLISODateTime, InputType } from "type-graphql";
import { TransactionType } from "../../models/transaction.model.js";

@InputType()
export class TransactionInput {
  @Field(() => String)
  description!: string;

  @Field(() => TransactionType)
  type!: TransactionType;

  /** Valor em unidades monetárias (será gravado como centavos). */
  @Field(() => Number)
  amount!: number;

  @Field(() => GraphQLISODateTime)
  date!: Date;

  @Field(() => String)
  categoryId!: string;
}
