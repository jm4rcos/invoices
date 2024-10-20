import { json } from "body-parser";
import cors from "cors";
import express from "express";

import errorMiddleware from "./middlewares/error.middleware";
import consumerRoutes from "./routes/consumer.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import invoiceRoutes from "./routes/invoice.routes";

const app = express();

const corsOptions = {
  origin: ["https://lumi-invoice-app.vercel.app", "http://localhost:3000"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(json());

app.use("/api/invoices", invoiceRoutes);
app.use("/api/consumers", consumerRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/health", (_, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(errorMiddleware);

export default app;
