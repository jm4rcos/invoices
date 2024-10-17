import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectDatabase() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database");
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
}

export { prisma };
