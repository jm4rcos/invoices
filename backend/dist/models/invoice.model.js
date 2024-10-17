"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.invoiceSchema = void 0;
const zod_1 = require("zod");
const invoiceSchema = zod_1.z.object({
    id: zod_1.z.string(),
    clientNumber: zod_1.z.string(),
    referenceMonth: zod_1.z.string(),
    energyConsumption: zod_1.z.number(),
    compensatedEnergy: zod_1.z.number(),
    totalValue: zod_1.z.number(),
});
exports.invoiceSchema = invoiceSchema;
