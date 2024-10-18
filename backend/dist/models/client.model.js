"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientSchema = void 0;
const zod_1 = require("zod");
const invoice_model_1 = require("./invoice.model");
const uc_model_1 = require("./uc.model");
const clientSchema = zod_1.z.object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    clientNumber: zod_1.z.string(),
    invoices: zod_1.z.array(invoice_model_1.invoiceSchema),
    ucs: zod_1.z.array(uc_model_1.ucSchema),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.clientSchema = clientSchema;
