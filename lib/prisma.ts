import { PrismaClient } from "@prisma/client";

console.log("PRISMA CLIENT INITIALIZING - DATABASE_URL:", process.env.DATABASE_URL);

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
