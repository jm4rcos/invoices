import { Router } from "express";
import multer from "multer";

import { InvoiceController } from "../controllers/invoice.controller";
import { InvoiceService } from "../services/invoice.service";
import { PdfService } from "../services/pdf.service";

const invoiceRouter = Router();
const upload = multer();

const pdfService = new PdfService();
const invoiceService = new InvoiceService();
const invoiceController = new InvoiceController(pdfService, invoiceService);

invoiceRouter.post(
  "/upload",
  upload.single("pdf"),
  invoiceController.uploadInvoice.bind(invoiceController)
);

invoiceRouter.get("/", invoiceController.getInvoices.bind(invoiceController));

export default invoiceRouter;
