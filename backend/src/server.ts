import { PrismaClient } from "@prisma/client";
import { Server } from "http";
import app from "./app";

let server: Server;
const prisma = new PrismaClient();

export const setup = async () => {
  await prisma.$connect();
  server = app.listen(3000);
};

export const teardown = async () => {
  server.close();
  await prisma.$disconnect();
};
