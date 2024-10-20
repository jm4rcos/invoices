import pdf from "pdf-parse";
import { ExtractInvoice } from "../dtos/extract-invoice.dto";

export class PdfService {
  async extractDataFromPDF(pdfBuffer: Buffer) {
    const data = await pdf(pdfBuffer);

    const extractedData: ExtractInvoice = {
      clientNumber: this.extractClientNumber(data.text),
      clientName: this.extractConsumerName(data.text),
      installationNumber: this.extractInstallationNumber(data.text),
      invoice: {
        referenceMonth: this.extractReferenceMonth(data.text),
        electricityKwh: this.extractElectricityKwh(data.text),
        electricityValue: this.extractElectricityValue(data.text),
        sceeEnergyKwh: this.extractSceeEnergyKwh(data.text),
        sceeEnergyValue: this.extractSceeEnergyValue(data.text),
        distributor: this.extractDistributorName(data.text),
        compensatedEnergyGDIKwh: this.extractCompensatedEnergyGDIKwh(data.text),
        compensatedEnergyGDIValue: this.extractCompensatedEnergyGDIValue(
          data.text
        ),
        totalValue: this.extractTotalValue(data.text),
        pdfUrl: "",
      },
    };

    return extractedData;
  }

  private extractClientNumber(text: string): string {
    const clientNumberMatch = text.match(
      /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/
    );

    return clientNumberMatch ? clientNumberMatch[1] : "";
  }

  private extractConsumerName(text: string): string {
    const companyPatterns = [
      "SELFWAY TREINAMENTO PERSONALIZADO LTDA",
      "JOSE MESALY FONSECA DE CARVALHO 52024156",
    ];

    for (const pattern of companyPatterns) {
      const companyMatch = text.match(new RegExp(pattern));
      if (companyMatch) {
        return companyMatch[0];
      }
    }

    return "Sem Nome";
  }

  private extractDistributorName(text: string): string {
    const distributorLineMatch = text.match(
      /DOCUMENTO AUXILIAR DA NOTA FISCAL DE ENERGIA ELÉTRICA ELETRÔNICA SEGUNDA VIA\s+(.+?)\s+CNPJ/
    );
    return distributorLineMatch ? distributorLineMatch[1].trim() : "";
  }

  private extractInstallationNumber(text: string): string {
    const regex = /\s*(\d+)\s+(?=Referente a)/;
    const match = text.match(regex);

    if (match && match[1]) {
      return match[1];
    } else {
      return "";
    }
  }

  private extractReferenceMonth(text: string): string {
    const referenceMonthMatch = text.match(/Referente a\s+([A-Z]{3}\/\d{4})/);

    if (!referenceMonthMatch) {
      const fallbackMatch = text.match(/([A-Z]{3}\/\d{4})/);
      return fallbackMatch ? fallbackMatch[1] : "";
    }

    return referenceMonthMatch[1];
  }

  private extractElectricityKwh(text: string): number {
    const match = text.match(/Energia ElétricakWh\s+(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private extractElectricityValue(text: string): number {
    const match = text.match(/Energia ElétricakWh\s+\d+\s+[\d,]+\s+([\d,]+)/);
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }

  private extractSceeEnergyKwh(text: string): number {
    const match = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private extractSceeEnergyValue(text: string): number {
    const match = text.match(
      /Energia SCEE s\/ ICMSkWh\s+\d+\s+[\d,]+\s+([\d,]+)/
    );
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }

  private extractCompensatedEnergyGDIKwh(text: string): number {
    const match = text.match(/Energia compensada GD IkWh\s+(\d+)/);
    return match ? parseInt(match[1], 10) : 0;
  }

  private extractCompensatedEnergyGDIValue(text: string): number {
    const match = text.match(
      /Energia compensada GD IkWh\s+\d+\s+[\d,]+\s+(-?[\d,]+)/
    );
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }

  private extractTotalValue(text: string): number {
    const match = text.match(/TOTAL\s+([\d,]+)/);
    return match ? parseFloat(match[1].replace(",", ".")) : 0;
  }
}
