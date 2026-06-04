import { prisma } from "../lib/prisma.js";

export class UserService {
  async findById(id: string) {
    return prisma.user.findUnique({ where: { id } });
  }
}
