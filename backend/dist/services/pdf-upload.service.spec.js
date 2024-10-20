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
const cloudinary_1 = __importDefault(require("cloudinary"));
const pdf_upload_service_1 = require("./pdf-upload.service");
jest.mock("cloudinary", () => ({
    v2: {
        config: jest.fn(),
        uploader: {
            upload_stream: jest.fn((_, callback) => {
                callback(null, {
                    secure_url: "https://mock-cloudinary-url.com/test.pdf",
                });
                return {
                    pipe: jest.fn(),
                };
            }),
        },
    },
}));
const mockCloudinary = cloudinary_1.default;
describe("PdfUploadService", () => {
    it("should upload a PDF to Cloudinary", () => __awaiter(void 0, void 0, void 0, function* () {
        const pdfUploadService = new pdf_upload_service_1.PdfUploadService();
        const mockPdfBuffer = Buffer.from("mock PDF content");
        const result = yield pdfUploadService.uploadPdfToCloudinary(mockPdfBuffer);
        expect(result).toBe("https://mock-cloudinary-url.com/test.pdf");
        expect(mockCloudinary.v2.uploader.upload_stream).toHaveBeenCalled();
    }));
});
