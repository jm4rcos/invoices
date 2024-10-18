"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const error_middleware_1 = __importDefault(require("./middlewares/error.middleware"));
const consumer_routes_1 = __importDefault(require("./routes/consumer.routes"));
const dashboard_routes_1 = __importDefault(require("./routes/dashboard.routes"));
const invoice_routes_1 = __importDefault(require("./routes/invoice.routes"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use((0, body_parser_1.json)());
app.use("/api/invoices", invoice_routes_1.default);
app.use("/api/consumers", consumer_routes_1.default);
app.use("/api/dashboard", dashboard_routes_1.default);
app.use("/api/health", (_, res) => {
    res.status(200).json({ message: "OK" });
});
app.use(error_middleware_1.default);
exports.default = app;
