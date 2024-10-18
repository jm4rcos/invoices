"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceSchema = void 0;
const zod_1 = require("zod");
const InvoiceSchema = zod_1.z.object({
    id: zod_1.z.number().int().optional(),
    consumerUnitId: zod_1.z.number().int(),
    referenceMonth: zod_1.z.string(),
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
exports.InvoiceSchema = InvoiceSchema;
