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
exports.InvoiceRepository = void 0;
class InvoiceRepository {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findFirst(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.invoice.findFirst({ where });
        });
    }
    findMany(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.invoice.findMany({ where });
        });
    }
    create(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.prisma.invoice.create({ data });
        });
    }
}
exports.InvoiceRepository = InvoiceRepository;
