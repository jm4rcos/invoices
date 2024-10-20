import { Router } from "express";
import multer from "multer";

import { PrismaClient } from "@prisma/client";
import { PdfServiceAdapter } from "../adapters/pdf-service-adapter";
import { InvoiceController } from "../controllers/invoice.controller";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { InvoiceRepository } from "../repositories/invoice/invoice.repository";
import { InvoiceService } from "../services/invoice.service";

const invoiceRouter = Router();
const upload = multer();

const prisma = new PrismaClient();
const pdfServiceAdapter = new PdfServiceAdapter();
const invoiceRepository = new InvoiceRepository(prisma);
const consumerRepository = new ConsumerRepository(prisma);
const invoiceService = new InvoiceService(
  pdfServiceAdapter,
  invoiceRepository,
  consumerRepository
);
const invoiceController = new InvoiceController(
  pdfServiceAdapter,
  invoiceService
);

invoiceRouter.post(
  "/upload",
  upload.single("pdf"),
  invoiceController.uploadInvoice.bind(invoiceController)
);

invoiceRouter.get("/", invoiceController.getInvoices.bind(invoiceController));

export default invoiceRouter;
