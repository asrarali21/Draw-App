import { PrismaClient } from "./generated";

declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ?? new PrismaClient();

// Avoid creating a new client on every hot-reload in dev. In prod we let it be GC'd per process.
const isProd = (globalThis as any)?.process?.env?.NODE_ENV === "production";
if (!isProd) {
  globalThis.prisma = prisma as PrismaClient;
}