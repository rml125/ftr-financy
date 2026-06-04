import type { TransactionInput } from "../dtos/input/transaction.input.js";
import { prisma } from "../lib/prisma.js";
import { CategoryService } from "./category.service.js";

export class TransactionService {
  private categories = new CategoryService();

  async create(request: TransactionInput, userId: string) {
    await this.categories.assertOwned(request.categoryId, userId);
    return prisma.transaction.create({
      data: {
        description: request.description,
        type: request.type,
        amountInCents: Math.round(request.amount * 100),
        date: request.date,
        categoryId: request.categoryId,
        userId,
      },
      include: {
        category: true,
      },
    });
  }

  async listByUser(userId: string) {
    return prisma.transaction.findMany({
      where: { userId },
      orderBy: { date: "desc" },
      include: {
        category: true,
      },
    });
  }

  async findById(transactionId: string, userId: string) {
    const row = await prisma.transaction.findFirst({
      where: { id: transactionId, userId },
      include: { category: true },
    });
    if (!row) {
      throw new Error("Transaction not found");
    }
    return row;
  }

  async update(transactionId: string, request: TransactionInput, userId: string) {
    await this.findById(transactionId, userId);
    await this.categories.assertOwned(request.categoryId, userId);

    return prisma.transaction.update({
      where: { id: transactionId },
      data: {
        description: request.description,
        type: request.type,
        amountInCents: Math.round(request.amount * 100),
        date: request.date,
        categoryId: request.categoryId,
      },
      include: {
        category: true,
      },
    });
  }

  async delete(transactionId: string, userId: string) {
    await this.findById(transactionId, userId);
    return prisma.transaction.delete({
      where: { id: transactionId },
      include: {
        category: true,
      },
    });
  }
}
