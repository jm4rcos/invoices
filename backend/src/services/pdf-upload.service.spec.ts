import cloudinary from "cloudinary";
import { PdfUploadService } from "./pdf-upload.service";

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

const mockCloudinary = cloudinary as jest.Mocked<typeof cloudinary>;

describe("PdfUploadService", () => {
  it("should upload a PDF to Cloudinary", async () => {
    const pdfUploadService = new PdfUploadService();
    const mockPdfBuffer = Buffer.from("mock PDF content");

    const result = await pdfUploadService.uploadPdfToCloudinary(mockPdfBuffer);

    expect(result).toBe("https://mock-cloudinary-url.com/test.pdf");
    expect(mockCloudinary.v2.uploader.upload_stream).toHaveBeenCalled();
  });
});
