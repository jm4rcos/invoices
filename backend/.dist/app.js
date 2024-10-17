"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
// import invoiceRoutes from "./routes/invoice.routes";
// import errorMiddleware from "./middlewares/error.middleware";
const app = (0, express_1.default)();
// Middlewares
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
// Routes
// app.use("/api/invoices", invoiceRoutes);
// Error handling middleware
// app.use(errorMiddleware);
exports.default = app;
