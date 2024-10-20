import { PdfUploadService } from "../services/pdf-upload.service";
import { PdfService } from "../services/pdf.service";

export class PdfServiceAdapter extends PdfService implements PdfUploadService {
  constructor() {
    super();
  }

  async uploadPdfToCloudinary(pdfBuffer: Buffer): Promise<string> {
    const extractedData = await this.extractDataFromPDF(pdfBuffer);

    return `https://placeholder-url.com/${extractedData.clientNumber}.pdf`;
  }
}
