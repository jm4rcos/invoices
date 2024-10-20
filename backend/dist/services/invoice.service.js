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
exports.InvoiceService = void 0;
class InvoiceService {
    constructor(pdfUploadService, invoiceRepository, consumerRepository) {
        this.pdfUploadService = pdfUploadService;
        this.invoiceRepository = invoiceRepository;
        this.consumerRepository = consumerRepository;
    }
    createInvoice(data, pdfBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const consumerUnitData = {
                    clientNumber: data.clientNumber,
                    clientName: data.clientName,
                    installationNumber: data.installationNumber,
                };
                const consumerUnit = yield this.getOrCreateConsumerUnit(consumerUnitData);
                const where = {
                    consumerUnitId: consumerUnit.id,
                    referenceMonth: data.invoice.referenceMonth,
                };
                const existingInvoice = yield this.invoiceRepository.findFirst(where);
                if (existingInvoice) {
                    console.log("Esta fatura ja existe!");
                    return existingInvoice;
                }
                const pdfUrl = yield this.pdfUploadService.uploadPdfToCloudinary(pdfBuffer);
                data.invoice.pdfUrl = pdfUrl;
                const createInvoiceData = Object.assign(Object.assign({}, data.invoice), { consumerUnitId: consumerUnit.id });
                return this.invoiceRepository.create(createInvoiceData);
            }
            catch (error) {
                console.error("Erro ao criar fatura:", error);
                throw error;
            }
        });
    }
    getOrCreateConsumerUnit(consumerUnitData) {
        return __awaiter(this, void 0, void 0, function* () {
            let consumerUnit = yield this.consumerRepository.findFirst({
                clientNumber: consumerUnitData.clientNumber,
            });
            if (!consumerUnit) {
                consumerUnit = yield this.consumerRepository.create(Object.assign({}, consumerUnitData));
            }
            return consumerUnit;
        });
    }
    getInvoices(clientNumber, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (clientNumber) {
                const consumerUnit = yield this.consumerRepository.findFirst({
                    clientNumber,
                });
                if (consumerUnit) {
                    where.consumerUnitId = consumerUnit.id;
                }
            }
            if (month)
                where.referenceMonth = month;
            return this.invoiceRepository.findMany(where);
        });
    }
}
exports.InvoiceService = InvoiceService;
