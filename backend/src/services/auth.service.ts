import type { LoginInput, RegisterInput } from "../dtos/input/auth.input.js";
import { prisma } from "../lib/prisma.js";
import { comparePassword, hashPassword } from "../utils/hash.js";
import { signJwt } from "../utils/jwt.js";

export class AuthService {
  async register(data: RegisterInput) {
    const existingUser = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (existingUser) {
      throw new Error("Email já registrado");
    }
    const hashedPassword = await hashPassword(data.password);
    return prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
      },
    });
  }

  async login(data: LoginInput) {
    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });
    if (!user) {
      throw new Error("Email ou senha inválidos");
    }
    const valid = await comparePassword(data.password, user.password);
    if (!valid) {
      throw new Error("Email ou senha inválidos");
    }
    return user;
  }

  buildAuthPayload(user: {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  }) {
    const token = signJwt({ id: user.id, email: user.email }, "1d");
    const refreshToken = signJwt({ id: user.id, email: user.email }, "7d");
    const publicUser = {
      id: user.id,
      name: user.name,
      email: user.email,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return { token, refreshToken, user: publicUser };
  }
}
