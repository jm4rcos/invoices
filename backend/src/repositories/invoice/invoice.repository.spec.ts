import { Invoice, PrismaClient } from "@prisma/client";
import { mockDeep, mockReset } from "jest-mock-extended";
import {
  mockCreateInvoice,
  mockInvoice,
} from "../../dtos/__mocks__/invoice.mock";
import { InvoiceRepository } from "../invoice/invoice.repository";

const mockPrisma = mockDeep<PrismaClient>();

const mockWhere = { consumerUnitId: "1", referenceMonth: "JAN/2023" };

describe("InvoiceRepository", () => {
  let invoiceRepository: InvoiceRepository;

  beforeEach(() => {
    mockReset(mockPrisma);
    invoiceRepository = new InvoiceRepository(mockPrisma);
  });

  describe("findFirst", () => {
    it("should return the first invoice that matches the query", async () => {
      mockPrisma.invoice.findFirst.mockResolvedValue(mockInvoice);

      const result = await invoiceRepository.findFirst(mockWhere);

      expect(result).toEqual(mockInvoice);
      expect(mockPrisma.invoice.findFirst).toHaveBeenCalledWith({
        where: mockWhere,
      });
    });

    it("should return null if no invoice matches the query", async () => {
      mockPrisma.invoice.findFirst.mockResolvedValue(null);

      const result = await invoiceRepository.findFirst(mockWhere);

      expect(result).toBeNull();
      expect(mockPrisma.invoice.findFirst).toHaveBeenCalledWith({
        where: mockWhere,
      });
    });
  });

  describe("findMany", () => {
    it("should return all invoices that match the query", async () => {
      const mockInvoices: Invoice[] = [mockInvoice];

      mockPrisma.invoice.findMany.mockResolvedValue(mockInvoices);

      const result = await invoiceRepository.findMany(mockWhere);

      expect(result).toEqual(mockInvoices);
      expect(mockPrisma.invoice.findMany).toHaveBeenCalledWith({
        where: mockWhere,
      });
    });

    it("should return an empty array if no invoices match the query", async () => {
      mockPrisma.invoice.findMany.mockResolvedValue([]);

      const result = await invoiceRepository.findMany(mockWhere);

      expect(result).toEqual([]);
      expect(mockPrisma.invoice.findMany).toHaveBeenCalledWith({
        where: mockWhere,
      });
    });
  });

  describe("create", () => {
    it("should create a new invoice", async () => {
      mockPrisma.invoice.create.mockResolvedValue(mockInvoice);

      const result = await invoiceRepository.create(mockCreateInvoice);

      expect(result).toEqual(mockInvoice);
      expect(mockPrisma.invoice.create).toHaveBeenCalledWith({
        data: mockCreateInvoice,
      });
    });
  });
});
