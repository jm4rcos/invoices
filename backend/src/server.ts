import { PrismaClient } from "@prisma/client";
import { config } from "dotenv";
import app from "./app";

config();

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3333;

async function startServer() {
  try {
    await prisma.$connect();
    console.log("Connected to database");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    await prisma.$disconnect();
    process.exit(1);
  }
}

startServer();

process.on("SIGINT", async () => {
  await prisma.$disconnect();
  process.exit(0);
});
