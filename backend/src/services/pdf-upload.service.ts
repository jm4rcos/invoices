import { v2 as cloudinary, UploadApiResponse } from "cloudinary";
import streamifier from "streamifier";

export class PdfUploadService {
  constructor() {
    if (
      !process.env.CLOUDINARY_CLOUD_NAME ||
      !process.env.CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      throw new Error("Cloudinary credentials are not set");
    }

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  async uploadPdfToCloudinary(pdfBuffer: Buffer): Promise<string> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          format: "pdf",
          folder: "invoices",
        },
        (error, result: UploadApiResponse | undefined) => {
          if (result) {
            resolve(result.secure_url);
          }
          if (error) {
            console.error("Error uploading PDF:", error);
            reject(error);
          }
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });
  }
}
