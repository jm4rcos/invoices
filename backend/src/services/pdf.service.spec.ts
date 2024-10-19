import cloudinary from "cloudinary";
import { mockCreateInvoice } from "../dtos/__mock__/invoice.mock";
import { PdfService } from "./pdf.service";

jest.mock("pdf-parse", () => {
  return jest.fn().mockResolvedValue({
    text: "Mock PDF content with clientNumber: 12345, clientName: Teste, installationNumber: 67890",
  });
});

jest.mock("cloudinary", () => ({
  v2: {
    config: jest.fn(),
    uploader: {
      upload: jest.fn(),
    },
  },
}));

describe("PdfService", () => {
  let pdfService: PdfService;

  beforeEach(() => {
    pdfService = new PdfService();
    jest.clearAllMocks();
  });

  it("should extract data from a PDF", async () => {
    const mockPdfBuffer = Buffer.from("Mock PDF content");

    const expectedData = {
      clientNumber: "12345",
      clientName: "Cliente",
      installationNumber: "67890",
      invoice: mockCreateInvoice,
    };

    jest
      .spyOn(pdfService, "extractDataFromPDF")
      .mockResolvedValue(expectedData);

    const result = await pdfService.extractDataFromPDF(mockPdfBuffer);

    expect(result).toEqual(expectedData);
  });

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
});
