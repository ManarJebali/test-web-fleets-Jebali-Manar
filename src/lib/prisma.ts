import { PrismaClient } from "@prisma/client";

// Standard Next.js singleton pattern: avoids exhausting DB connections from
// hot-reloaded modules in dev, where every edit would otherwise instantiate
// a fresh PrismaClient.
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
