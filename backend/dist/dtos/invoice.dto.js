"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceDto = exports.CreateInvoiceDto = void 0;
const zod_1 = require("zod");
const InvoiceDto = zod_1.z.object({
    id: zod_1.z.string().optional(),
    consumerUnitId: zod_1.z.string(),
    referenceMonth: zod_1.z.string(),
    distributor: zod_1.z.string(),
    electricityKwh: zod_1.z.number().min(0),
    electricityValue: zod_1.z.number().min(0),
    sceeEnergyKwh: zod_1.z.number().min(0),
    sceeEnergyValue: zod_1.z.number().min(0),
    compensatedEnergyGDIKwh: zod_1.z.number().min(0),
    compensatedEnergyGDIValue: zod_1.z.number().min(0),
    totalValue: zod_1.z.number().min(0),
    pdfUrl: zod_1.z.string().optional(),
    createdAt: zod_1.z.date().optional(),
    updatedAt: zod_1.z.date().optional(),
});
exports.InvoiceDto = InvoiceDto;
const CreateInvoiceDto = zod_1.z.object({
    consumerUnitId: zod_1.z.string(),
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
exports.CreateInvoiceDto = CreateInvoiceDto;
