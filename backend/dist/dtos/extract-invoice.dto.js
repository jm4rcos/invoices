"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtractInvoiceDto = void 0;
const zod_1 = require("zod");
const InvoiceItemDto = zod_1.z.object({
    referenceMonth: zod_1.z.string(),
    distributor: zod_1.z.string(),
    electricityKwh: zod_1.z.number().min(0),
    electricityValue: zod_1.z.number().min(0),
    sceeEnergyKwh: zod_1.z.number().min(0),
    sceeEnergyValue: zod_1.z.number().min(0),
    compensatedEnergyGDIKwh: zod_1.z.number().min(0),
    compensatedEnergyGDIValue: zod_1.z.number().min(0),
    totalValue: zod_1.z.number().min(0),
    pdfUrl: zod_1.z.string(),
});
const ExtractInvoiceDto = zod_1.z.object({
    clientNumber: zod_1.z.string(),
    clientName: zod_1.z.string(),
    installationNumber: zod_1.z.string(),
    invoice: InvoiceItemDto,
});
exports.ExtractInvoiceDto = ExtractInvoiceDto;
