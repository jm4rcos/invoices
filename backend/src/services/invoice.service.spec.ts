import { mockConsumer } from "../dtos/__mock__/consumer.mock";
import { mockInvoice } from "../dtos/__mock__/invoice.mock";
import { ConsumerRepository } from "../repositories/consumer/consumer.repository";
import { InvoiceRepository } from "../repositories/invoice/invoice.repository";
import { InvoiceService } from "./invoice.service";
import { PdfUploadService } from "./pdf-upload.service";

jest.mock("../repositories/invoice/invoice.repository");
jest.mock("../repositories/consumer/consumer.repository");
jest.mock("./pdf-upload.service");

const mockInvoiceRepository = InvoiceRepository as jest.MockedClass<
  typeof InvoiceRepository
>;
const mockConsumerRepository = ConsumerRepository as jest.MockedClass<
  typeof ConsumerRepository
>;
const mockPdfUploadService = PdfUploadService as jest.MockedClass<
  typeof PdfUploadService
>;

describe("InvoiceService", () => {
  let invoiceService: InvoiceService;

  beforeEach(() => {
    invoiceService = new InvoiceService();
    jest.clearAllMocks();
  });

  describe("createInvoice", () => {
    const pdfBuffer = Buffer.from("test pdf content");
    const extractInvoice = {
      clientNumber: mockConsumer.clientNumber,
      clientName: mockConsumer.clientName,
      installationNumber: mockConsumer.installationNumber,
      invoice: {
        ...mockInvoice,
        referenceMonth: "JAN/2023",
      },
    };

    it("should create a new invoice", async () => {
      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);
      mockConsumerRepository.prototype.create.mockResolvedValueOnce(
        mockConsumer
      );
      mockInvoiceRepository.prototype.findFirst.mockResolvedValueOnce(null);
      mockPdfUploadService.prototype.uploadPdfToCloudinary.mockResolvedValueOnce(
        "https://cloudinary.com/pdf/12345"
      );
      mockInvoiceRepository.prototype.create.mockResolvedValueOnce(mockInvoice);

      const result = await invoiceService.createInvoice(
        extractInvoice,
        pdfBuffer
      );

      expect(result).toEqual(mockInvoice);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber: extractInvoice.clientNumber,
      });
      expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith(
        mockConsumer
      );
      expect(mockInvoiceRepository.prototype.findFirst).toHaveBeenCalledWith({
        consumerUnitId: mockConsumer.id,
        referenceMonth: extractInvoice.invoice.referenceMonth,
      });
      expect(
        mockPdfUploadService.prototype.uploadPdfToCloudinary
      ).toHaveBeenCalledWith(pdfBuffer);
      expect(mockInvoiceRepository.prototype.create).toHaveBeenCalledWith({
        ...extractInvoice.invoice,
        consumerUnitId: mockConsumer.id,
        pdfUrl: "https://cloudinary.com/pdf/12345",
      });
    });

    it("should return existing invoice if it already exists", async () => {
      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(
        mockConsumer
      );
      mockInvoiceRepository.prototype.findFirst.mockResolvedValueOnce(
        mockInvoice
      );

      const result = await invoiceService.createInvoice(
        extractInvoice,
        pdfBuffer
      );

      expect(result).toEqual(mockInvoice);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber: extractInvoice.clientNumber,
      });
      expect(mockInvoiceRepository.prototype.findFirst).toHaveBeenCalledWith({
        consumerUnitId: mockConsumer.id,
        referenceMonth: extractInvoice.invoice.referenceMonth,
      });
      expect(
        mockPdfUploadService.prototype.uploadPdfToCloudinary
      ).not.toHaveBeenCalled();
      expect(mockInvoiceRepository.prototype.create).not.toHaveBeenCalled();
    });
  });

  describe("getInvoices", () => {
    it("should return invoices for a specific client", async () => {
      const clientNumber = mockConsumer.clientNumber;

      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(
        mockConsumer
      );
      mockInvoiceRepository.prototype.findMany.mockResolvedValueOnce([
        mockInvoice,
      ]);

      const result = await invoiceService.getInvoices(clientNumber);

      expect(result).toEqual([mockInvoice]);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber,
      });
      expect(mockInvoiceRepository.prototype.findMany).toHaveBeenCalledWith({
        consumerUnitId: mockConsumer.id,
      });
    });

    it("should return all invoices if no client is provided", async () => {
      mockInvoiceRepository.prototype.findMany.mockResolvedValueOnce([
        mockInvoice,
      ]);

      const result = await invoiceService.getInvoices();

      expect(result).toEqual([mockInvoice]);
      expect(mockConsumerRepository.prototype.findFirst).not.toHaveBeenCalled();
      expect(mockInvoiceRepository.prototype.findMany).toHaveBeenCalledWith({});
    });
  });

  describe("getOrCreateConsumerUnit", () => {
    const consumerUnitData = mockConsumer;

    it("should return existing consumer unit if it exists", async () => {
      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(
        mockConsumer
      );

      const result = await invoiceService["getOrCreateConsumerUnit"](
        consumerUnitData
      );

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber: consumerUnitData.clientNumber,
      });
      expect(mockConsumerRepository.prototype.create).not.toHaveBeenCalled();
    });

    it("should create a new consumer unit if it does not exist", async () => {
      mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);
      mockConsumerRepository.prototype.create.mockResolvedValueOnce(
        mockConsumer
      );

      const result = await invoiceService["getOrCreateConsumerUnit"](
        consumerUnitData
      );

      expect(result).toEqual(mockConsumer);
      expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
        clientNumber: consumerUnitData.clientNumber,
      });
      expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith(
        consumerUnitData
      );
    });
  });
});
