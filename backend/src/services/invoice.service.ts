import { PrismaClient } from "@prisma/client";
import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const prisma = new PrismaClient();

export class InvoiceService {
  async createInvoice(data: any, pdfBuffer: Buffer) {
    console.log("Cloudinary Config:", {
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

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

    const uploadResult = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: "auto",
          format: "pdf",
          folder: "invoices",
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading PDF:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      streamifier.createReadStream(pdfBuffer).pipe(uploadStream);
    });

    data.invoice.pdfUrl = (uploadResult as any).secure_url;

    let consumerUnit = await prisma.consumerUnit.findUnique({
      where: {
        clientNumber: data.consumerUnit.clientNumber,
      },
      select: {
        id: true,
      },
    });

    if (!consumerUnit) {
      consumerUnit = await prisma.consumerUnit.create({
        data: {
          ...data.consumerUnit,
        },
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
      create: {
        ...data.invoice,
        consumerUnitId: consumerUnit.id,
      },
    });
  }

  async getInvoices(clientNumber?: string, month?: string) {
    const where: any = {};
    if (clientNumber) {
      const consumerUnit = await prisma.consumerUnit.findUnique({
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
    if (month) where.referenceMonth = month;

    return prisma.invoice.findMany({ where });
  }
}
