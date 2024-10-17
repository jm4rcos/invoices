"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { PrismaClient } from "@prisma/client";
const dotenv_1 = require("dotenv");
const app_1 = __importDefault(require("./app"));
(0, dotenv_1.config)(); // Load environment variables
// const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // await prisma.$connect();
            console.log("Connected to database");
            app_1.default.listen(PORT, () => {
                console.log(`Server is running on port ${PORT}`);
            });
        }
        catch (error) {
            console.error("Failed to start server:", error);
            // await prisma.$disconnect();
            // process.exit(1);
        }
    });
}
startServer();
// process.on("SIGINT", async () => {
//   await prisma.$disconnect();
//   process.exit(0);
// });
