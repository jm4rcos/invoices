import cloudinary from "cloudinary";
import streamifier from "streamifier";
import { PdfUploadService } from "./pdf-upload.service";
import { PdfService } from "./pdf.service";

jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
    },
  },
}));

jest.mock("streamifier");

const mockCloudinary = cloudinary as jest.Mocked<typeof cloudinary>;
const mockStreamifier = streamifier as jest.Mocked<typeof streamifier>;

describe("PdfUploadService", () => {
  let pdfUploadService: PdfUploadService;
  let pdfService: PdfService;

  beforeEach(() => {
    pdfService = new PdfService();
    pdfUploadService = new PdfUploadService();
    jest.clearAllMocks();
  });

  describe("uploadPdfToCloudinary", () => {
    const pdfBuffer = Buffer.from("test pdf content");

    it("should upload a PDF to Cloudinary and return the secure URL", async () => {
      const mockPdfBuffer = Buffer.from("Mock PDF content");
      const mockSecureUrl = "https://cloudinary.com/pdf/12345";

      (cloudinary.v2.uploader.upload as jest.Mock).mockResolvedValue({
        secure_url: mockSecureUrl,
      });

      const result = await pdfService.extractDataFromPDF(mockPdfBuffer);
      expect(result).toEqual(mockSecureUrl);
      expect(cloudinary.v2.uploader.upload).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          resource_type: "raw",
          public_id: expect.any(String),
          format: "pdf",
        })
      );
    });

    it("should throw an error if the upload fails", async () => {
      const mockError = new Error("Upload failed");

      const mockUploadStream = jest.fn((options, callback) => {
        callback(mockError, undefined);
        return {
          on: jest.fn(),
          end: jest.fn(),
        };
      });

      (
        mockCloudinary.v2.uploader.upload_stream as jest.MockedFunction<
          typeof cloudinary.v2.uploader.upload_stream
        >
      ).mockImplementation();

      const mockReadStream = jest.fn();
      mockStreamifier.createReadStream.mockReturnValue({
        pipe: mockReadStream,
      } as any);

      await expect(
        pdfUploadService.uploadPdfToCloudinary(pdfBuffer)
      ).rejects.toThrow(mockError);

      expect(mockCloudinary.v2.uploader.upload_stream).toHaveBeenCalledWith(
        {
          resource_type: "auto",
          format: "pdf",
          folder: "invoices",
        },
        expect.any(Function)
      );
      expect(mockStreamifier.createReadStream).toHaveBeenCalledWith(pdfBuffer);
      expect(mockReadStream).toHaveBeenCalledWith(expect.any(Function));
    });
  });
});
