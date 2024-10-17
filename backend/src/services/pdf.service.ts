import pdf from "pdf-parse";

export class PdfService {
  async extractDataFromPDF(pdfBuffer: Buffer) {
    const data = await pdf(pdfBuffer);

    console.log("Extracted data:", data);

    const extractedData = {
      clientNumber: this.extractClientNumber(data.text),
      referenceMonth: this.extractReferenceMonth(data.text),
      energyConsumption: this.extractEnergyConsumption(data.text),
      compensatedEnergy: this.extractCompensatedEnergy(data.text),
      totalValue: this.extractTotalValue(data.text),
    };

    return extractedData;
  }

  private extractClientNumber(text: string): string {
    const clientNumberMatch = text.match(
      /Nº DO CLIENTE\s+Nº DA INSTALAÇÃO\s+(\d+)\s+(\d+)/
    );
    return clientNumberMatch ? clientNumberMatch[1] : "";
  }

  private extractReferenceMonth(text: string): string {
    const referenceMonthMatch = text.match(/Referente a\s+([A-Z]{3}\/\d{4})/);

    if (!referenceMonthMatch) {
      const fallbackMatch = text.match(/([A-Z]{3}\/\d{4})/);
      return fallbackMatch ? fallbackMatch[1] : "";
    }

    return referenceMonthMatch[1];
  }

  private extractEnergyConsumption(text: string): number {
    const energyElectricMatch = text.match(/Energia ElétricakWh\s+(\d+)/);
    const energySCEEMatch = text.match(/Energia SCEE s\/ ICMSkWh\s+(\d+)/);

    const energyElectric = energyElectricMatch
      ? parseInt(energyElectricMatch[1], 10)
      : 0;
    const energySCEE = energySCEEMatch ? parseInt(energySCEEMatch[1], 10) : 0;

    return energyElectric + energySCEE;
  }

  private extractCompensatedEnergy(text: string): number {
    const compensatedEnergyMatch = text.match(
      /Energia compensada GD IkWh\s+\d+\s+(-?\d+,\d+)/
    );
    return compensatedEnergyMatch
      ? parseFloat(compensatedEnergyMatch[1].replace(",", "."))
      : 0;
  }

  private extractTotalValue(text: string): number {
    const energyElectricValueMatch = text.match(
      /Energia ElétricakWh\s+\d+\s+\d+,\d+\s+(\d+,\d+)/
    );
    const energySCEEValueMatch = text.match(
      /Energia SCEE s\/ ICMSkWh\s+\d+\s+\d+,\d+\s+(\d+,\d+)/
    );
    const contribMunicipalMatch = text.match(
      /Contrib Ilum Publica Municipal\s+(\d+,\d+)/
    );

    const energyElectricValue = energyElectricValueMatch
      ? parseFloat(energyElectricValueMatch[1].replace(",", "."))
      : 0;
    const energySCEEValue = energySCEEValueMatch
      ? parseFloat(energySCEEValueMatch[1].replace(",", "."))
      : 0;
    const contribMunicipal = contribMunicipalMatch
      ? parseFloat(contribMunicipalMatch[1].replace(",", "."))
      : 0;

    return parseFloat(
      (energyElectricValue + energySCEEValue + contribMunicipal).toFixed(2)
    );
  }
}
