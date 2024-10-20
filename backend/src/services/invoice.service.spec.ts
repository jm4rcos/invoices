import { ConsumerUnit, Invoice, PrismaClient } from "@prisma/client";
import { DeepMockProxy, mockDeep } from "jest-mock-extended";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { InvoiceRepository } from "../repositories/invoice/invoice.repository";
import { InvoiceService } from "./invoice.service";
import { PdfUploadService } from "./pdf-upload.service";

describe("InvoiceService", () => {
  let invoiceService: InvoiceService;
  let mockPdfUploadService: jest.Mocked<PdfUploadService>;
  let mockInvoiceRepository: DeepMockProxy<InvoiceRepository>;
  let mockConsumerRepository: DeepMockProxy<ConsumerRepository>;
  let mockPrisma: DeepMockProxy<PrismaClient>;

  beforeEach(() => {
    mockPdfUploadService = mockDeep<PdfUploadService>();
    mockInvoiceRepository = mockDeep<InvoiceRepository>();
    mockConsumerRepository = mockDeep<ConsumerRepository>();
    mockPrisma = mockDeep<PrismaClient>();

    invoiceService = new InvoiceService(
      mockPdfUploadService,
      mockInvoiceRepository,
      mockConsumerRepository
    );
  });

  it("should create a new invoice", async () => {
    const mockInvoice: Invoice = {
      id: "1",
      consumerUnitId: "1",
      distributor: "distribuidora",
      referenceMonth: "JAN/2023",
      electricityKwh: 100,
      electricityValue: 50,
      sceeEnergyKwh: 20,
      sceeEnergyValue: 10,
      compensatedEnergyGDIKwh: 10,
      compensatedEnergyGDIValue: 5,
      totalValue: 55,
      pdfUrl: "https://cloudinary.com/pdf/12345",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-01T00:00:00.000Z"),
    };

    const mockConsumerUnit: ConsumerUnit = {
      id: "1",
      clientNumber: "123456",
      clientName: "John Doe",
      installationNumber: "789012",
      createdAt: new Date("2023-01-01T00:00:00.000Z"),
      updatedAt: new Date("2023-01-01T00:00:00.000Z"),
    };

    mockConsumerRepository.findFirst.mockResolvedValue(mockConsumerUnit);
    mockInvoiceRepository.findFirst.mockResolvedValue(null);
    mockPdfUploadService.uploadPdfToCloudinary.mockResolvedValue(
      "https://cloudinary.com/pdf/12345"
    );
    mockInvoiceRepository.create.mockResolvedValue(mockInvoice);

    const result = await invoiceService.createInvoice(
      {
        clientNumber: "123456",
        clientName: "John Doe",
        installationNumber: "789012",
        invoice: {
          distributor: "distribuidora",
          referenceMonth: "JAN/2023",
          electricityKwh: 100,
          electricityValue: 50,
          sceeEnergyKwh: 20,
          sceeEnergyValue: 10,
          compensatedEnergyGDIKwh: 10,
          compensatedEnergyGDIValue: 5,
          totalValue: 55,
          pdfUrl: "https://cloudinary.com/pdf/12345",
        },
      },
      Buffer.from("pdf content")
    );

    expect(result).toEqual(mockInvoice);
    expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
      clientNumber: "123456",
    });
    expect(mockInvoiceRepository.findFirst).toHaveBeenCalledWith({
      consumerUnitId: "1",
      referenceMonth: "JAN/2023",
    });
    expect(mockPdfUploadService.uploadPdfToCloudinary).toHaveBeenCalledWith(
      Buffer.from("pdf content")
    );
    expect(mockInvoiceRepository.create).toHaveBeenCalledWith({
      distributor: "distribuidora",
      referenceMonth: "JAN/2023",
      electricityKwh: 100,
      electricityValue: 50,
      sceeEnergyKwh: 20,
      sceeEnergyValue: 10,
      compensatedEnergyGDIKwh: 10,
      compensatedEnergyGDIValue: 5,
      totalValue: 55,
      pdfUrl: "https://cloudinary.com/pdf/12345",
      consumerUnitId: "1",
    });
  });
});
