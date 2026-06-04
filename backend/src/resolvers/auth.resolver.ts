import { Arg, Mutation, Resolver } from "type-graphql";
import { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import { AuthPayload } from "../dtos/output/auth.output.js";
import { AuthService } from "../services/auth.service.js";

@Resolver()
export class AuthResolver {
  constructor(private readonly authService = new AuthService()) {}

  @Mutation(() => AuthPayload)
  async register(@Arg("data", () => RegisterInput) data: RegisterInput) {
    const user = await this.authService.register(data);
    return this.authService.buildAuthPayload(user);
  }

  @Mutation(() => AuthPayload)
  async login(@Arg("data", () => LoginInput) data: LoginInput) {
    const user = await this.authService.login(data);
    return this.authService.buildAuthPayload(user);
  }
}
