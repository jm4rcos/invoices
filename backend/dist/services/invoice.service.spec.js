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
const invoice_service_1 = require("./invoice.service");
describe("InvoiceService", () => {
    let invoiceService;
    let mockPdfUploadService;
    let mockInvoiceRepository;
    let mockConsumerRepository;
    let mockPrisma;
    beforeEach(() => {
        mockPdfUploadService = (0, jest_mock_extended_1.mockDeep)();
        mockInvoiceRepository = (0, jest_mock_extended_1.mockDeep)();
        mockConsumerRepository = (0, jest_mock_extended_1.mockDeep)();
        mockPrisma = (0, jest_mock_extended_1.mockDeep)();
        invoiceService = new invoice_service_1.InvoiceService(mockPdfUploadService, mockInvoiceRepository, mockConsumerRepository);
    });
    it("should create a new invoice", () => __awaiter(void 0, void 0, void 0, function* () {
        const mockInvoice = {
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
        const mockConsumerUnit = {
            id: "1",
            clientNumber: "123456",
            clientName: "John Doe",
            installationNumber: "789012",
            createdAt: new Date("2023-01-01T00:00:00.000Z"),
            updatedAt: new Date("2023-01-01T00:00:00.000Z"),
        };
        mockConsumerRepository.findFirst.mockResolvedValue(mockConsumerUnit);
        mockInvoiceRepository.findFirst.mockResolvedValue(null);
        mockPdfUploadService.uploadPdfToCloudinary.mockResolvedValue("https://cloudinary.com/pdf/12345");
        mockInvoiceRepository.create.mockResolvedValue(mockInvoice);
        const result = yield invoiceService.createInvoice({
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
        }, Buffer.from("pdf content"));
        expect(result).toEqual(mockInvoice);
        expect(mockConsumerRepository.findFirst).toHaveBeenCalledWith({
            clientNumber: "123456",
        });
        expect(mockInvoiceRepository.findFirst).toHaveBeenCalledWith({
            consumerUnitId: "1",
            referenceMonth: "JAN/2023",
        });
        expect(mockPdfUploadService.uploadPdfToCloudinary).toHaveBeenCalledWith(Buffer.from("pdf content"));
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
    }));
});
