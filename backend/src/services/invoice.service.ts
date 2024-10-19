import { Invoice } from "@prisma/client";
import { CreateConsumer } from "../dtos/consumer.dto";
import { ExtractInvoice } from "../dtos/extract-invoice.dto";
import { CreateInvoice } from "../dtos/invoice.dto";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { InvoiceRepository } from "../repositories/invoice/invoice.repository";
import { PdfUploadService } from "./pdf-upload.service";

const pdfUploadService = new PdfUploadService();
const invoiceRepository = new InvoiceRepository();
const consumerRepository = new ConsumerRepository();

export class InvoiceService {
  async createInvoice(data: ExtractInvoice, pdfBuffer: Buffer) {
    try {
      const consumerUnitData: CreateConsumer = {
        clientNumber: data.clientNumber,
        clientName: data.clientName,
        installationNumber: data.installationNumber,
      };
      const consumerUnit = await this.getOrCreateConsumerUnit(consumerUnitData);

      const where = {
        consumerUnitId: consumerUnit.id,
        referenceMonth: data.invoice.referenceMonth,
      };

      const existingInvoice = await invoiceRepository.findFirst(where);

      if (existingInvoice) {
        console.log("Esta fatura ja existe!");
        return existingInvoice;
      }

      const pdfUrl = await pdfUploadService.uploadPdfToCloudinary(pdfBuffer);
      data.invoice.pdfUrl = pdfUrl;

      const createInvoiceData: CreateInvoice = {
        ...data.invoice,
        consumerUnitId: consumerUnit.id,
      };

      return invoiceRepository.create(createInvoiceData);
    } catch (error) {
      console.error("Erro ao criar fatura:", error);
      throw error;
    }
  }

  private async getOrCreateConsumerUnit(consumerUnitData: CreateConsumer) {
    let consumerUnit = await consumerRepository.findFirst({
      clientNumber: consumerUnitData.clientNumber,
    });

    if (!consumerUnit) {
      consumerUnit = await consumerRepository.create({
        ...consumerUnitData,
      });
    }

    return consumerUnit;
  }

  async getInvoices(clientNumber?: string, month?: string) {
    const where: Partial<Invoice> = {};
    if (clientNumber) {
      const consumerUnit = await consumerRepository.findFirst({
        clientNumber,
      });

      if (consumerUnit) {
        where.consumerUnitId = consumerUnit.id;
      }
    }
    if (month) where.referenceMonth = month;

    return invoiceRepository.findMany(where);
  }
}
