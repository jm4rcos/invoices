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
const consumer_mock_1 = require("../dtos/__mocks__/consumer.mock");
const invoice_mock_1 = require("../dtos/__mocks__/invoice.mock");
const consumer_repository_1 = require("../repositories/cosumer/consumer.repository");
const invoice_repository_1 = require("../repositories/invoice/invoice.repository");
const pdf_upload_ervice_1 = require("../utils/pdf-upload.ervice");
const invoice_service_1 = require("./invoice.service");
jest.mock("../repositories/invoice/invoice.repository");
jest.mock("../repositories/consumer/consumer.repository");
jest.mock("../utils/pdf-upload.service");
const mockInvoiceRepository = invoice_repository_1.InvoiceRepository;
const mockConsumerRepository = consumer_repository_1.ConsumerRepository;
const mockPdfUploadService = pdf_upload_ervice_1.PdfUploadService;
describe("InvoiceService", () => {
    let invoiceService;
    beforeEach(() => {
        invoiceService = new invoice_service_1.InvoiceService();
        jest.clearAllMocks();
    });
    describe("createInvoice", () => {
        const pdfBuffer = Buffer.from("test pdf content");
        const extractInvoice = {
            clientNumber: consumer_mock_1.mockConsumer.clientNumber,
            clientName: consumer_mock_1.mockConsumer.clientName,
            installationNumber: consumer_mock_1.mockConsumer.installationNumber,
            invoice: Object.assign(Object.assign({}, invoice_mock_1.mockInvoice), { referenceMonth: "JAN/2023" }),
        };
        it("should create a new invoice", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);
            mockConsumerRepository.prototype.create.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            mockInvoiceRepository.prototype.findFirst.mockResolvedValueOnce(null);
            mockPdfUploadService.prototype.uploadPdfToCloudinary.mockResolvedValueOnce("https://cloudinary.com/pdf/12345");
            mockInvoiceRepository.prototype.create.mockResolvedValueOnce(invoice_mock_1.mockInvoice);
            const result = yield invoiceService.createInvoice(extractInvoice, pdfBuffer);
            expect(result).toEqual(invoice_mock_1.mockInvoice);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber: extractInvoice.clientNumber,
            });
            expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith(consumer_mock_1.mockConsumer);
            expect(mockInvoiceRepository.prototype.findFirst).toHaveBeenCalledWith({
                consumerUnitId: consumer_mock_1.mockConsumer.id,
                referenceMonth: extractInvoice.invoice.referenceMonth,
            });
            expect(mockPdfUploadService.prototype.uploadPdfToCloudinary).toHaveBeenCalledWith(pdfBuffer);
            expect(mockInvoiceRepository.prototype.create).toHaveBeenCalledWith(Object.assign(Object.assign({}, extractInvoice.invoice), { consumerUnitId: consumer_mock_1.mockConsumer.id, pdfUrl: "https://cloudinary.com/pdf/12345" }));
        }));
        it("should return existing invoice if it already exists", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            mockInvoiceRepository.prototype.findFirst.mockResolvedValueOnce(invoice_mock_1.mockInvoice);
            const result = yield invoiceService.createInvoice(extractInvoice, pdfBuffer);
            expect(result).toEqual(invoice_mock_1.mockInvoice);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber: extractInvoice.clientNumber,
            });
            expect(mockInvoiceRepository.prototype.findFirst).toHaveBeenCalledWith({
                consumerUnitId: consumer_mock_1.mockConsumer.id,
                referenceMonth: extractInvoice.invoice.referenceMonth,
            });
            expect(mockPdfUploadService.prototype.uploadPdfToCloudinary).not.toHaveBeenCalled();
            expect(mockInvoiceRepository.prototype.create).not.toHaveBeenCalled();
        }));
    });
    describe("getInvoices", () => {
        it("should return invoices for a specific client", () => __awaiter(void 0, void 0, void 0, function* () {
            const clientNumber = consumer_mock_1.mockConsumer.clientNumber;
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            mockInvoiceRepository.prototype.findMany.mockResolvedValueOnce([
                invoice_mock_1.mockInvoice,
            ]);
            const result = yield invoiceService.getInvoices(clientNumber);
            expect(result).toEqual([invoice_mock_1.mockInvoice]);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber,
            });
            expect(mockInvoiceRepository.prototype.findMany).toHaveBeenCalledWith({
                consumerUnitId: consumer_mock_1.mockConsumer.id,
            });
        }));
        it("should return all invoices if no client is provided", () => __awaiter(void 0, void 0, void 0, function* () {
            mockInvoiceRepository.prototype.findMany.mockResolvedValueOnce([
                invoice_mock_1.mockInvoice,
            ]);
            const result = yield invoiceService.getInvoices();
            expect(result).toEqual([invoice_mock_1.mockInvoice]);
            expect(mockConsumerRepository.prototype.findFirst).not.toHaveBeenCalled();
            expect(mockInvoiceRepository.prototype.findMany).toHaveBeenCalledWith({});
        }));
    });
    describe("getOrCreateConsumerUnit", () => {
        const consumerUnitData = consumer_mock_1.mockConsumer;
        it("should return existing consumer unit if it exists", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield invoiceService["getOrCreateConsumerUnit"](consumerUnitData);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber: consumerUnitData.clientNumber,
            });
            expect(mockConsumerRepository.prototype.create).not.toHaveBeenCalled();
        }));
        it("should create a new consumer unit if it does not exist", () => __awaiter(void 0, void 0, void 0, function* () {
            mockConsumerRepository.prototype.findFirst.mockResolvedValueOnce(null);
            mockConsumerRepository.prototype.create.mockResolvedValueOnce(consumer_mock_1.mockConsumer);
            const result = yield invoiceService["getOrCreateConsumerUnit"](consumerUnitData);
            expect(result).toEqual(consumer_mock_1.mockConsumer);
            expect(mockConsumerRepository.prototype.findFirst).toHaveBeenCalledWith({
                clientNumber: consumerUnitData.clientNumber,
            });
            expect(mockConsumerRepository.prototype.create).toHaveBeenCalledWith(consumerUnitData);
        }));
    });
});
