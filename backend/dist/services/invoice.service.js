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
exports.InvoiceService = void 0;
const client_1 = require("@prisma/client");
const cloudinary_1 = require("cloudinary");
const streamifier_1 = __importDefault(require("streamifier"));
const prisma = new client_1.PrismaClient();
class InvoiceService {
    createInvoice(data, pdfBuffer) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Cloudinary Config:", {
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            // Verificar se as credenciais estão definidas
            if (!process.env.CLOUDINARY_CLOUD_NAME ||
                !process.env.CLOUDINARY_API_KEY ||
                !process.env.CLOUDINARY_API_SECRET) {
                throw new Error("Cloudinary credentials are not set");
            }
            // Configurar o Cloudinary
            cloudinary_1.v2.config({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            });
            // Upload do PDF para o Cloudinary
            const uploadResult = yield new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                    resource_type: "auto", // Especifica que o tipo de recurso deve ser detectado automaticamente
                    format: "pdf", // Especifica o formato como PDF
                    folder: "invoices", // Opcional: pasta onde o arquivo será armazenado
                }, (error, result) => {
                    if (error) {
                        console.error("Error uploading PDF:", error);
                        reject(error);
                    }
                    else {
                        console.log("PDF uploaded to Cloudinary:", result);
                        resolve(result);
                    }
                });
                streamifier_1.default.createReadStream(pdfBuffer).pipe(uploadStream);
            });
            // Salva a URL do PDF retornado pelo Cloudinary
            data.invoice.pdfUrl = uploadResult.secure_url;
            // Encontra o consumerUnitId baseado no clientNumber
            let consumerUnit = yield prisma.consumerUnit.findUnique({
                where: {
                    clientNumber: data.consumerUnit.clientNumber,
                },
                select: {
                    id: true,
                },
            });
            // Se o consumerUnit não existir, cria um novo
            if (!consumerUnit) {
                consumerUnit = yield prisma.consumerUnit.create({
                    data: Object.assign({}, data.consumerUnit),
                    select: {
                        id: true,
                    },
                });
            }
            // Upsert com os dados da fatura
            return prisma.invoice.upsert({
                where: {
                    consumerUnitId_referenceMonth: {
                        consumerUnitId: consumerUnit.id,
                        referenceMonth: data.invoice.referenceMonth,
                    },
                },
                update: data.invoice,
                create: Object.assign(Object.assign({}, data.invoice), { consumerUnitId: consumerUnit.id }),
            });
        });
    }
    getInvoices(clientNumber, month) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            if (clientNumber) {
                const consumerUnit = yield prisma.consumerUnit.findUnique({
                    where: {
                        clientNumber,
                    },
                    select: {
                        id: true,
                    },
                });
                if (consumerUnit) {
                    where.consumerUnitId = consumerUnit.id;
                }
            }
            if (month)
                where.referenceMonth = month;
            return prisma.invoice.findMany({ where });
        });
    }
}
exports.InvoiceService = InvoiceService;
