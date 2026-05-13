import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const isServer = typeof window === "undefined";

export const prisma = isServer
  ? globalForPrisma.prisma ?? new PrismaClient()
  : (undefined as unknown as PrismaClient);

if (process.env.NODE_ENV !== "production" && isServer) {
  globalForPrisma.prisma = prisma;
}
