"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ucSchema = void 0;
const zod_1 = require("zod");
const invoice_model_1 = require("./invoice.model");
const ucSchema = zod_1.z.object({
    id: zod_1.z.string(),
    number: zod_1.z.string(),
    client: zod_1.z.array(zod_1.z.string()),
    invoices: zod_1.z.array(invoice_model_1.invoiceSchema),
});
exports.ucSchema = ucSchema;
