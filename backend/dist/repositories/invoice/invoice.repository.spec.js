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
const jest_mock_extended_1 = require("jest-mock-extended");
const invoice_mock_1 = require("../../dtos/__mocks__/invoice.mock");
const invoice_repository_1 = require("../invoice/invoice.repository");
const mockPrisma = (0, jest_mock_extended_1.mockDeep)();
const mockWhere = { consumerUnitId: "1", referenceMonth: "JAN/2023" };
describe("InvoiceRepository", () => {
    let invoiceRepository;
    beforeEach(() => {
        (0, jest_mock_extended_1.mockReset)(mockPrisma);
        invoiceRepository = new invoice_repository_1.InvoiceRepository(mockPrisma);
    });
    describe("findFirst", () => {
        it("should return the first invoice that matches the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.invoice.findFirst.mockResolvedValue(invoice_mock_1.mockInvoice);
            const result = yield invoiceRepository.findFirst(mockWhere);
            expect(result).toEqual(invoice_mock_1.mockInvoice);
            expect(mockPrisma.invoice.findFirst).toHaveBeenCalledWith({
                where: mockWhere,
            });
        }));
        it("should return null if no invoice matches the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.invoice.findFirst.mockResolvedValue(null);
            const result = yield invoiceRepository.findFirst(mockWhere);
            expect(result).toBeNull();
            expect(mockPrisma.invoice.findFirst).toHaveBeenCalledWith({
                where: mockWhere,
            });
        }));
    });
    describe("findMany", () => {
        it("should return all invoices that match the query", () => __awaiter(void 0, void 0, void 0, function* () {
            const mockInvoices = [invoice_mock_1.mockInvoice];
            mockPrisma.invoice.findMany.mockResolvedValue(mockInvoices);
            const result = yield invoiceRepository.findMany(mockWhere);
            expect(result).toEqual(mockInvoices);
            expect(mockPrisma.invoice.findMany).toHaveBeenCalledWith({
                where: mockWhere,
            });
        }));
        it("should return an empty array if no invoices match the query", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.invoice.findMany.mockResolvedValue([]);
            const result = yield invoiceRepository.findMany(mockWhere);
            expect(result).toEqual([]);
            expect(mockPrisma.invoice.findMany).toHaveBeenCalledWith({
                where: mockWhere,
            });
        }));
    });
    describe("create", () => {
        it("should create a new invoice", () => __awaiter(void 0, void 0, void 0, function* () {
            mockPrisma.invoice.create.mockResolvedValue(invoice_mock_1.mockInvoice);
            const result = yield invoiceRepository.create(invoice_mock_1.mockCreateInvoice);
            expect(result).toEqual(invoice_mock_1.mockInvoice);
            expect(mockPrisma.invoice.create).toHaveBeenCalledWith({
                data: invoice_mock_1.mockCreateInvoice,
            });
        }));
    });
});
