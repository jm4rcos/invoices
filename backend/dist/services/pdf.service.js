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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PdfService = void 0;
const pdf_parse_1 = __importDefault(require("pdf-parse"));
class PdfService {
    extractDataFromPDF(pdfBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield (0, pdf_parse_1.default)(pdfBuffer);
            console.log("Extracted data:", data);
            const extractedData = {
                clientNumber: this.extractClientNumber(data.text),
                referenceMonth: this.extractReferenceMonth(data.text),
                energyConsumption: this.extractEnergyConsumption(data.text),
                compensatedEnergy: this.extractCompensatedEnergy(data.text),
                totalValue: this.extractTotalValue(data.text),
            };
            return extractedData;
        });
    }
    extractClientNumber(text) {
        const clientNumberMatch = text.match(/Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/);
        return clientNumberMatch ? clientNumberMatch[1] : "";
    }
    extractReferenceMonth(text) {
        const referenceMonthMatch = text.match(/Referente a\s+([A-Z]{3}\/\d{4})/);
        if (!referenceMonthMatch) {
            const fallbackMatch = text.match(/([A-Z]{3}\/\d{4})/);
            return fallbackMatch ? fallbackMatch[1] : "";
        }
        return referenceMonthMatch[1];
    }
    extractEnergyConsumption(text) {
        const energyElectricMatch = text.match(/Energia ElétricakWh\s+(\d+)/);
        const energySCEEMatch = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+)/);
        const energyElectric = energyElectricMatch
            ? parseInt(energyElectricMatch[1], 10)
            : 0;
        const energySCEE = energySCEEMatch ? parseInt(energySCEEMatch[1], 10) : 0;
        return energyElectric + energySCEE;
    }
    extractCompensatedEnergy(text) {
        const compensatedEnergyMatch = text.match(/Energia compensada GD IkWh\s+\d+\s+(-?\d+,\d+)/);
        return compensatedEnergyMatch
            ? parseFloat(compensatedEnergyMatch[1].replace(",", "."))
            : 0;
    }
    extractTotalValue(text) {
        const energyElectricValueMatch = text.match(/Energia ElétricakWh\s+\d+\s+\d+,\d+\s+(\d+,\d+)/);
        const energySCEEValueMatch = text.match(/Energia SCEE s\/ ICMSkWh\s+\d+\s+\d+,\d+\s+(\d+,\d+)/);
        const contribMunicipalMatch = text.match(/Contrib Ilum Publica Municipal\s+(\d+,\d+)/);
        const energyElectricValue = energyElectricValueMatch
            ? parseFloat(energyElectricValueMatch[1].replace(",", "."))
            : 0;
        const energySCEEValue = energySCEEValueMatch
            ? parseFloat(energySCEEValueMatch[1].replace(",", "."))
            : 0;
        const contribMunicipal = contribMunicipalMatch
            ? parseFloat(contribMunicipalMatch[1].replace(",", "."))
            : 0;
        return parseFloat((energyElectricValue + energySCEEValue + contribMunicipal).toFixed(2));
    }
}
exports.PdfService = PdfService;
