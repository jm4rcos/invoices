import { json } from "body-parser";
import cors from "cors";
import express from "express";
import errorMiddleware from "./middlewares/error.middleware";
import invoiceRoutes from "./routes/invoice.routes";

const app = express();

app.use(cors());
app.use(json());

app.use("/api/invoices", invoiceRoutes);
app.use("/api/health", (_, res) => {
  res.status(200).json({ message: "OK" });
});

app.use(errorMiddleware);

export default app;
