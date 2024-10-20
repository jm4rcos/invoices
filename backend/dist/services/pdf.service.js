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
            const extractedData = {
                clientNumber: this.extractClientNumber(data.text),
                clientName: this.extractConsumerName(data.text),
                installationNumber: this.extractInstallationNumber(data.text),
                invoice: {
                    referenceMonth: this.extractReferenceMonth(data.text),
                    electricityKwh: this.extractElectricityKwh(data.text),
                    electricityValue: this.extractElectricityValue(data.text),
                    sceeEnergyKwh: this.extractSceeEnergyKwh(data.text),
                    sceeEnergyValue: this.extractSceeEnergyValue(data.text),
                    distributor: this.extractDistributorName(data.text),
                    compensatedEnergyGDIKwh: this.extractCompensatedEnergyGDIKwh(data.text),
                    compensatedEnergyGDIValue: this.extractCompensatedEnergyGDIValue(data.text),
                    totalValue: this.extractTotalValue(data.text),
                    pdfUrl: "",
                },
            };
            return extractedData;
        });
    }
    extractClientNumber(text) {
        const clientNumberMatch = text.match(/Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/);
        return clientNumberMatch ? clientNumberMatch[1] : "";
    }
    extractConsumerName(text) {
        const companyPatterns = [
            "SELFWAY TREINAMENTO PERSONALIZADO LTDA",
            "JOSE MESALY FONSECA DE CARVALHO 52024156",
        ];
        for (const pattern of companyPatterns) {
            const companyMatch = text.match(new RegExp(pattern));
            if (companyMatch) {
                return companyMatch[0];
            }
        }
        return "Sem Nome";
    }
    extractDistributorName(text) {
        const distributorLineMatch = text.match(/DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICA SEGUNDA VIA\s+(.+?)\s+CNPJ/);
        return distributorLineMatch ? distributorLineMatch[1].trim() : "";
    }
    extractInstallationNumber(text) {
        const regex = /\s*(\d+)\s+(?=Referente a)/;
        const match = text.match(regex);
        if (match && match[1]) {
            return match[1];
        }
        else {
            return "";
        }
    }
    extractReferenceMonth(text) {
        const referenceMonthMatch = text.match(/Referente a\s+([A-Z]{3}\/\d{4})/);
        if (!referenceMonthMatch) {
            const fallbackMatch = text.match(/([A-Z]{3}\/\d{4})/);
            return fallbackMatch ? fallbackMatch[1] : "";
        }
        return referenceMonthMatch[1];
    }
    extractElectricityKwh(text) {
        const match = text.match(/Energia ElétricakWh\s+(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
    extractElectricityValue(text) {
        const match = text.match(/Energia ElétricakWh\s+\d+\s+[\d,]+\s+([\d,]+)/);
        return match ? parseFloat(match[1].replace(",", ".")) : 0;
    }
    extractSceeEnergyKwh(text) {
        const match = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
    extractSceeEnergyValue(text) {
        const match = text.match(/Energia SCEE s\/ ICMSkWh\s+\d+\s+[\d,]+\s+([\d,]+)/);
        return match ? parseFloat(match[1].replace(",", ".")) : 0;
    }
    extractCompensatedEnergyGDIKwh(text) {
        const match = text.match(/Energia compensada GD IkWh\s+(\d+)/);
        return match ? parseInt(match[1], 10) : 0;
    }
    extractCompensatedEnergyGDIValue(text) {
        const match = text.match(/Energia compensada GD IkWh\s+\d+\s+[\d,]+\s+(-?[\d,]+)/);
        return match ? parseFloat(match[1].replace(",", ".")) : 0;
    }
    extractTotalValue(text) {
        const match = text.match(/TOTAL\s+([\d,]+)/);
        return match ? parseFloat(match[1].replace(",", ".")) : 0;
    }
}
exports.PdfService = PdfService;
