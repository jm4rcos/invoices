"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceService = void 0;
const consumer_repository_1 = require("../repositories/cosumer/consumer.repository");
const invoice_repository_1 = require("../repositories/invoice/invoice.repository");
const pdf_upload_ervice_1 = require("../utils/pdf-upload.ervice");
const pdfUploadService = new pdf_upload_ervice_1.PdfUploadService();
const invoiceRepository = new invoice_repository_1.InvoiceRepository();
const consumerRepository = new consumer_repository_1.ConsumerRepository();
class InvoiceService {
  createInvoice(data, pdfBuffer) {
    return __awaiter(this, void 0, void 0, function* () {
      try {
        const consumerUnitData = {
          clientNumber: data.clientNumber,
          clientName: data.clientName,
          installationNumber: data.installationNumber,
        };
        const consumerUnit = yield this.getOrCreateConsumerUnit(
          consumerUnitData
        );
        const where = {
          consumerUnitId: consumerUnit.id,
          referenceMonth: data.invoice.referenceMonth,
        };
        const existingInvoice = yield invoiceRepository.findFirst(where);
        if (existingInvoice) {
          console.log("Esta fatura ja existe!");
          return existingInvoice;
        }
        const pdfUrl = yield pdfUploadService.uploadPdfToCloudinary(pdfBuffer);
        data.invoice.pdfUrl = pdfUrl;
        const createInvoiceData = Object.assign(
          Object.assign({}, data.invoice),
          { consumerUnitId: consumerUnit.id }
        );
        return invoiceRepository.create(createInvoiceData);
      } catch (error) {
        console.error("Error creating invoice:", error);
        throw error;
      }
    });
  }
  getOrCreateConsumerUnit(consumerUnitData) {
    return __awaiter(this, void 0, void 0, function* () {
      let consumerUnit = yield consumerRepository.findFirst({
        clientNumber: consumerUnitData.clientNumber,
      });
      if (!consumerUnit) {
        consumerUnit = yield consumerRepository.create(
          Object.assign({}, consumerUnitData)
        );
      }
      return consumerUnit;
    });
  }
  getInvoices(clientNumber, month) {
    return __awaiter(this, void 0, void 0, function* () {
      const where = {};
      if (clientNumber) {
        const consumerUnit = yield consumerRepository.findFirst({
          clientNumber,
        });
        if (consumerUnit) {
          where.consumerUnitId = consumerUnit.id;
        }
      }
      if (month) where.referenceMonth = month;
      return invoiceRepository.findMany(where);
    });
  }
}
exports.InvoiceService = InvoiceService;
