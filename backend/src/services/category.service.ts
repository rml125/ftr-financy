import type { CategoryInput } from "../dtos/input/category.input.js";
import { prisma } from "../lib/prisma.js";

export class CategoryService {
  async create(request: CategoryInput, userId: string) {
    return prisma.category.create({
      data: {
        title: request.title,
        description: request.description,
        icon: request.icon,
        color: request.color,
        userId,
      },
    });
  }

  async listByUser(userId: string) {
    return prisma.category.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(categoryId: string, userId: string) {
    const category = await prisma.category.findFirst({
      where: { id: categoryId, userId },
    });
    if (!category) {
      throw new Error("Category not found");
    }
    return category;
  }

  async update(categoryId: string, request: CategoryInput, userId: string) {
    await this.findById(categoryId, userId);
    return prisma.category.update({
      where: { id: categoryId },
      data: {
        title: request.title,
        description: request.description,
        icon: request.icon,
        color: request.color,
      },
    });
  }

  async delete(categoryId: string, userId: string) {
    await this.findById(categoryId, userId);
    return prisma.category.delete({ where: { id: categoryId } });
  }

  async assertOwned(categoryId: string, userId: string) {
    return this.findById(categoryId, userId);
  }
}
