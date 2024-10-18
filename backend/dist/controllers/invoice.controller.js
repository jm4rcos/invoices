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
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceController = void 0;
class InvoiceController {
    constructor(pdfService, invoiceService) {
        this.pdfService = pdfService;
        this.invoiceService = invoiceService;
        this.uploadInvoice = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const pdfFile = req.file;
                if (!pdfFile) {
                    res.status(400).json({ message: "No PDF file uploaded" });
                    return;
                }
                const extractedData = yield this.pdfService.extractDataFromPDF(pdfFile.buffer);
                const upsertedInvoice = yield this.invoiceService.createInvoice(extractedData);
                res.status(200).json(upsertedInvoice);
            }
            catch (error) {
                next(error);
            }
        });
        this.getInvoices = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { clientNumber, month } = req.query;
                const invoices = yield this.invoiceService.getInvoices(clientNumber, month);
                res.json(invoices);
            }
            catch (error) {
                next(error);
            }
        });
        this.getDashboardData = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const dashboardData = yield this.invoiceService.getDashboardData();
                res.json(dashboardData);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.InvoiceController = InvoiceController;
