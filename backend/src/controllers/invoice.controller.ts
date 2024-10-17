import { NextFunction, Request, Response } from "express";
import { InvoiceService } from "../services/invoice.service";
import { PdfService } from "../services/pdf.service";

export class InvoiceController {
  constructor(
    private pdfService: PdfService,
    private invoiceService: InvoiceService
  ) {}

  uploadInvoice = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const pdfFile = req.file;
      if (!pdfFile) {
        res.status(400).json({ message: "No PDF file uploaded" });
        return;
      }
      const extractedData = await this.pdfService.extractDataFromPDF(
        pdfFile.buffer
      );

      const upsertedInvoice = await this.invoiceService.createInvoice(
        extractedData
      );

      res.status(200).json(upsertedInvoice);
    } catch (error) {
      next(error);
    }
  };

  getInvoices = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { clientNumber, month } = req.query;
      const invoices = await this.invoiceService.getInvoices(
        clientNumber as string,
        month as string
      );
      res.json(invoices);
    } catch (error) {
      next(error);
    }
  };

  getDashboardData = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const dashboardData = await this.invoiceService.getDashboardData();
      res.json(dashboardData);
    } catch (error) {
      next(error);
    }
  };
}
