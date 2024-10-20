import { Invoice } from "@prisma/client";
import { CreateConsumer } from "../dtos/consumer.dto";
import { ExtractInvoice } from "../dtos/extract-invoice.dto";
import { CreateInvoice } from "../dtos/invoice.dto";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { InvoiceRepository } from "../repositories/invoice/invoice.repository";
import { PdfUploadService } from "./pdf-upload.service";

export class InvoiceService {
  constructor(
    private pdfUploadService: PdfUploadService,
    private invoiceRepository: InvoiceRepository,
    private consumerRepository: ConsumerRepository
  ) {}

  async createInvoice(
    data: ExtractInvoice,
    pdfBuffer: Buffer
  ): Promise<Invoice> {
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

      const existingInvoice = await this.invoiceRepository.findFirst(where);

      if (existingInvoice) {
        console.log("Esta fatura ja existe!");
        return existingInvoice;
      }

      const pdfUrl = await this.pdfUploadService.uploadPdfToCloudinary(
        pdfBuffer
      );
      data.invoice.pdfUrl = pdfUrl;

      const createInvoiceData: CreateInvoice = {
        ...data.invoice,
        consumerUnitId: consumerUnit.id,
      };

      return this.invoiceRepository.create(createInvoiceData);
    } catch (error) {
      console.error("Erro ao criar fatura:", error);
      throw error;
    }
  }

  private async getOrCreateConsumerUnit(consumerUnitData: CreateConsumer) {
    let consumerUnit = await this.consumerRepository.findFirst({
      clientNumber: consumerUnitData.clientNumber,
    });

    if (!consumerUnit) {
      consumerUnit = await this.consumerRepository.create({
        ...consumerUnitData,
      });
    }

    return consumerUnit;
  }

  async getInvoices(clientNumber?: string, month?: string) {
    const where: Partial<Invoice> = {};
    if (clientNumber) {
      const consumerUnit = await this.consumerRepository.findFirst({
        clientNumber,
      });

      if (consumerUnit) {
        where.consumerUnitId = consumerUnit.id;
      }
    }
    if (month) where.referenceMonth = month;

    return this.invoiceRepository.findMany(where);
  }
}
