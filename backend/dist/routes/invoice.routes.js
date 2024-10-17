"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const invoice_controller_1 = require("../controllers/invoice.controller");
const invoice_service_1 = require("../services/invoice.service");
const pdf_service_1 = require("../services/pdf.service");
const router = (0, express_1.Router)();
const upload = (0, multer_1.default)();
const pdfService = new pdf_service_1.PdfService();
const invoiceService = new invoice_service_1.InvoiceService();
const invoiceController = new invoice_controller_1.InvoiceController(pdfService, invoiceService);
router.post("/upload", upload.single("pdf"), invoiceController.uploadInvoice);
router.get("/", invoiceController.getInvoices.bind(invoiceController));
router.get("/dashboard", invoiceController.getDashboardData.bind(invoiceController));
exports.default = router;
