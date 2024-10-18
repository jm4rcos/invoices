import { Router } from "express";
import multer from "multer";

import { InvoiceController } from "../controllers/invoice.controller";
import { InvoiceService } from "../services/invoice.service";
import { PdfService } from "../services/pdf.service";

const router = Router();
const upload = multer();

const pdfService = new PdfService();
const invoiceService = new InvoiceService();
const invoiceController = new InvoiceController(pdfService, invoiceService);

router.post("/upload", upload.single("pdf"), invoiceController.uploadInvoice);

router.get("/", invoiceController.getInvoices.bind(invoiceController));

// router.get(
//   "/:clientNumber",
//   invoiceController.getInvoicesByClientNumber.bind(invoiceController)
// );

// router.get(
//   "/dashboard",
//   invoiceController.getDashboardData.bind(invoiceController)
// );

export default router;
