import { Field, ObjectType } from "type-graphql";
import { User } from "../../models/user.model.js";

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token!: string;

  @Field(() => String)
  refreshToken!: string;

  @Field(() => User)
  user!: User;
}
