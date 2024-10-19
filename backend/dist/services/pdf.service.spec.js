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
const fs_1 = require("fs");
const pdf_service_1 = require("../../services/pdf.service");
describe("PdfService", () => {
    let pdfService;
    beforeEach(() => {
        pdfService = new pdf_service_1.PdfService();
    });
    it("should extract data from a PDF", () => __awaiter(void 0, void 0, void 0, function* () {
        const pdfBuffer = (0, fs_1.readFileSync)("path/to/test/pdf.pdf");
        const expectedData = {
            clientNumber: "12345",
            clientName: "Test Client",
            installationNumber: "67890",
            invoice: {
                referenceMonth: "JAN/2023",
                electricityKwh: 100,
                electricityValue: 100,
                sceeEnergyKwh: 50,
                sceeEnergyValue: 50,
                distributor: "Distributor",
                compensatedEnergyGDIKwh: 20,
                compensatedEnergyGDIValue: 20,
                totalValue: 170,
                pdfUrl: "",
            },
        };
        const result = yield pdfService.extractDataFromPDF(pdfBuffer);
        expect(result).toEqual(expectedData);
    }));
});
